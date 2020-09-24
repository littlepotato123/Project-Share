const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const firebase = require('firebase');
const { _onRequestWithOptions } = require('firebase-functions/lib/providers/https');

var firebaseConfig = {
  apiKey: "AIzaSyDNQRLwHXC_zYcknNdf1rplcYpBP2qIKxA",
  authDomain: "project-share-8df06.firebaseapp.com",
  databaseURL: "https://project-share-8df06.firebaseio.com",
  projectId: "project-share-8df06",
  storageBucket: "project-share-8df06.appspot.com",
  messagingSenderId: "242999336210",
  appId: "1:242999336210:web:43105302d4336a9113a7cb",
  measurementId: "G-FXCLV7D7WE"
};

firebase.initializeApp(firebaseConfig);

const db = admin.firestore()

const FBAuth = (req, res, next) => {
  let idToken;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  admin.auth()
    .verifyIdToken(idToken)
      .then(decodedToken => {
        req.user = decodedToken;
        return db.collection('users')
          .where('userId', '==', req.user.uid)
          .limit(1)
          .get();
      })
      .then(data => {
        req.user.handle = data.docs[0].data().handle;
        return next();
      })
      .catch(err => {
        return res.status(403).json(err)
      })
}

// Creating Posts
app.post('/createPost', FBAuth, (req, res) => {
  const newPost = {
    body: req.body.body,
    author: req.user.handle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    title: req.body.title,
    category: req.body.category,
    likes: 0,
    comments: 0
  }

  db
    .collection('posts')
    .add(newPost)
    .then(doc => {
      res.json({ message: `${doc.id} has been created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err);
    })
})

// Sign Up
const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.match(regEx)) return true;
  else return false;
}

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle
  };

  let errors = {};
  if(isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else {
    errors.email = 'Must be a valid email address';
  }

  if(isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match';

  if(isEmpty(newUser.userHandle)) errors.userHandle = 'Must not be empty';

  if(Object.keys(errors).length > 0) return res.status(400).json(errors);

  // Validate Data
  let idToken;
  let userId;
  db
    .doc(`/users/${newUser.userHandle}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'This handle already exists' })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken()
    })
    .then(token => {
      idToken = token;
      const userCred = {
        handle: newUser.userHandle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId
      };
      return db
        .doc(`/users/${newUser.userHandle}`)
        .set(userCred)
    })
    .then(() => {
      return res.status(201).json({ idToken })
    })
    .catch(err => {
      if(err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' })
      } else {
        res.status(500).json({ error: err.code })
      }
    })
})

// Login
app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  let errors = {};

  if(isEmpty(user.email)) errors.email = 'Must not be empty';
  if(isEmpty(user.password)) errors.password = 'Must not be empty';

  if(Object.keys(errors).length > 0) return res.json(errors);

  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(err => {
      if(err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong Credentials, please try again' })
      } else {
        res.status(500).json({ error: err.code });
      }
    })
})

// Liking Posts
app.post('/likePost', (req, res) => {
  const likes = req.body.likes + 1;
  const changedPost = {
    body: req.body.body,
    author: req.body.author,
    createdAt: req.body.createdAt,
    title: req.body.title,
    category: req.body.category,
    likes: likes,
    comments: req.body.comments
  };

  db
    .collection('posts')
    .doc(req.body.id)
    .set(changedPost)
    .then(() => {
      res.json({ message: 'successfully liked' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Unlike Posts
app.post('/unlikePost', (req, res) => {
  const likes = req.body.likes - 1;
  const changedPost = {
    body: req.body.body,
    author: req.body.author,
    createdAt: req.body.createdAt,
    title: req.body.title,
    category: req.body.category,
    likes: likes,
    comments: req.body.comments
  };

  db
    .collection('posts')
    .doc(req.body.id)
    .set(changedPost)
    .then(() => {
      res.json({ message: 'successfully unliked' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Commenting Posts

// Following User

// Getting Random Posts => Home Page
app.get('/getHome', (req, res) => {
  db
    .collection('posts')
    .limit(50)
    .get()
    .then(data => {
      let posts = []; 
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          author: doc.data().author,
          likes: doc.data().likes,
          comments: doc.data().comments,
          category: doc.data().category,
          title: doc.data().title
        })
      });
      return res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Getting Popular Posts
app.get('/getPopular', (req,res) => {
  db
    .collection('posts')
    .orderBy('likes', 'desc')
    .limit(20)
    .get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          author: doc.data().author,
          likes: doc.data().likes,
          comments: doc.data().comments,
          category: doc.data().category,
          title: doc.data().title
        })
      });
      return res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Getting Leaderboard Users

// Getting Top 20 Users

// Creating Category
app.post('/newCategory', (req, res) => {
  const newCategory = {
    title: req.body.title,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  db
    .collection('categories')
    .add(newCategory)
    .then(doc => {
      res.json({ message: `${doc.id} created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'Error Occured' })
    })
})

// Getting All Categories
app.get('/getCategories', (req, res) => {
  db
    .collection('categories')
    .get()
    .then(data => {
      let categories = [];
      data.forEach(doc => {
        categories.push({
          categoryId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt
        })
      })
      res.json(categories);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error occured' })
    })
})

// Deleting Posts
app.delete('/deletePost', (req, res) => {
  const id = req.body.id;
  db
    .collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      res.json({ message: 'Post deleted' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Error occ' })
    })
})

// Deleting User

exports.api = functions.https.onRequest(app);