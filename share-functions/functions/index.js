const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const firebase = require('firebase');

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
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
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

// Checking if logged in
app.post('/getHandle', FBAuth, (req, res) => {
  return res.status(200).json({ handle: req.user.handle })
})

// Creating Posts
app.post('/createPost', FBAuth, (req, res) => {
  const newPost = {
    body: req.body.body,
    author: req.user.handle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    title: req.body.title,
    category: req.body.category,
    likes: 0,
  }

  db
    .collection('posts')
    .add(newPost)
    .then(doc => {
      db
        .collection('categories')
        .doc(newPost.category)
        .set({
          "title": newPost.category
        })
        .then(() => {
          return res.status(200).json({ message: "Created Post Successfully" });
        })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err);
    })
})

// Sign Up
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle,
    imageUrl: req.body.url,
    bio: req.body.boi
  };

  let errors = {};
  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (isEmail(newUser.email) == false) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match';

  if (isEmpty(newUser.userHandle)) errors.userHandle = 'Must not be empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let idToken;
  let userId;
  db
    .doc(`/users/${newUser.userHandle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
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
        userId: userId,
        supporters: 0,
        url: newUser.imageUrl,
        bio: newUser.bio
      };
      return db
        .doc(`/users/${newUser.userHandle}`)
        .set(userCred)
    })
    .then(() => {
      return res.status(201).json({ idToken })
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
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

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  if (Object.keys(errors).length > 0) return res.json(errors);

  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(idToken => {
      return res.json({ idToken });
    })
    .catch(err => {
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong Credentials, please try again' })
      } else {
        res.status(500).json({ error: err.code });
      }
    })
})

// Message User
app.post('/messageUser', FBAuth, (req, res) => {
  const message = {
    message: req.body.message,
    author: req.user.handle
  };

  db
    .collection(req.body.uid)
    .add(message)
    .then(doc => {
      return res.status(201).json({ message: `${doc.id} successfully created` })
    })
    .catch(err => {
      return res.status(500).json({ error: 'Error Occured' });
    })
})

// Liking Posts
app.post('/likePost', (req, res) => {
  const changedPost = {
    body: req.body.body,
    author: req.body.author,
    title: req.body.title,
    category: req.body.category,
    likes: req.body.likes + 1,
  };

  db
    .collection('posts')
    .doc(req.body.id)
    .set(changedPost)
    .then(() => {
      res.json({ message: 'successfully liked' })
    })
    .catch(err => {
      res.status(301).json({ error: 'Something went wrong' })
    })
})

// Unlike Posts
app.post('/unlikePost', (req, res) => {
  const changedPost = {
    body: req.body.body,
    author: req.body.author,
    title: req.body.title,
    category: req.body.category,
    likes: req.body.likes,
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
app.post('/createComment', FBAuth, (req, res) => {
  const id = req.body.id;
  const newComment = {
    body: req.body.body,
    author: req.user.handle,
    createdAt: new Date().toISOString()
  }

  db
    .collection(`${id}`)
    .add(newComment)
    .then(doc => {
      return res.status(200).json({ message: `${doc.id} created and commented` })
    })
    .catch(err => {
      return res.status(500).json({ error: err.code })
    })
})

// Getting Comments
app.post('/getComment', (req, res) => {
  db
    .collection(req.body.id)
    .get()
    .then(data => {
      let comments = [];
      data.forEach(doc => {
        comments.push(doc.data());
      })
      if (comments.length > 0) {
        return res.status(201).json(comments);
      } else {
        return res.status(403).json({ error: 'Could not find post' })
      }
    })
    .catch(err => {
      return res.json({ error: err.code })
    })
})

// Gaining Supporters
app.post('/followUser', (req, res) => {
  const supporters = req.body.supporters + 1;
  const account = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userld: req.body.userld
  };

  db
    .collection('supporters')
    .doc(req.body.id)
    .set(changeNumOfSupporters)
    .then(() => {
      res.json({ message: 'successfully followed' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Losing Supporters
app.post('/unfollowUser', (req, res) => {
  const supporters = req.body.supporters - 1;
  const account = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAT,
    userld: req.body.userld
  };

  db
    .collection('supporters')
    .doc(req.body.id)
    .set(changeNumOfSupporters)
    .then(() => {
      res.json({ message: 'successfully unfollowed' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
    })
})

// Messaging User
app.post('/messageUser', (req, res) => {
  const newMessage = {
    message: req.body.message
  };

  db
    .collection(req.body.id)
    .add(newMessage)
    .then(doc => {
      res.status(201).json({ message: `${doc.id} messaged` });
    })
    .catch(err => {
      res.status(500).json({ error: err.code });
    })
})

// Getting Messaging User
app.post('/getMessages', (req, res) => {
  db
    .collection(req.body.id)
    .limit(10)
    .get()
    .then(data => {
      let messages = [];
      data.forEach(doc => {
        messages.push(doc.data());
      })
      return res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({ error: err.code });
    })
})

// Following User
app.post('/followUser', (req, res) => {
  const supporters = req.body.supporters + 1;
  const newUser = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userId: req.body.userId
  };

  db
    .collection('users')
    .doc(req.body.handle)
    .set(newUser)
    .then(() => {
      return res.status(201).json({ message: 'successfully followed' });
    })
    .catch(() => {
      return res.status(500).json({ error: err.code })
    })
})

// Unfollowing User
app.post('/unfollowUser', (req, res) => {
  const supporters = req.body.supporters - 1;
  const newUser = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userId: req.body.userId
  };

  db
    .collection('users')
    .doc(req.body.handle)
    .set(newUser)
    .then(() => {
      return res.status(201).json({ message: 'successfully unfollowed' });
    })
    .catch(() => {
      return res.status(500).json({ error: err.code })
    })
})

// Getting Random Posts => Home Page
app.get('/getHome', (req, res) => {
  db
    .collection('posts')
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
app.get('/getPopular', (req, res) => {
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
app.get('/leaderboard', (req, res) => {
  db
    .collection('users')
    .orderBy('supporters', 'desc')
    .limit(10)
    .get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        users.push(doc.data())
      });
      return res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
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
app.post('/deletePost', FBAuth, (req, res) => {
  const id = req.body.id;

  db
    .collection('posts')
    .doc(id)
    .get()
    .then(doc => {
      if (req.user.handle == doc.data().author) {
        db
          .collection('posts')
          .doc(id)
          .delete()
          .then(() => {
            res.json({ message: 'Post deleted' })
          })
          .catch(err => {
            res.status(500).json({ error: 'Error occured' })
          })
      } else {
        res.status(403).json({ error: 'Not Logged in to correct user' })
      }
    })
})

// Deleting User
app.post('/deleteUser', (req, res) => {
  const user = firebase.auth().currentUser;

  if (user == null) {
    res.status(500).json({ error: 'Not logged In' })
  }

  user
    .delete()
    .then(() => {
      res.status(202).json({ message: 'Successfully Deleted' })
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error Occured' })
    });
})

// Get User
app.post('/getUser', (req, res) => {
  const userHandle = req.body.userHandle;

  db
    .collection('users')
    .doc(userHandle)
    .get()
    .then(doc => {
      return res.status(200).json({ user: doc.data() })
    })
    .catch(err => {
      return res.status(500).json({ error: 'Could not find user' })
    })
})

// Get All User's Posts
app.post('/getUserPost', (req, res) => {
  const user = req.body.user;

  db
    .collection('posts')
    .where('author', '==', user)
    .get()
    .then(data => {
      const posts = [];
      data.forEach(doc => {
        posts.push(doc.data())
      })
      return res.status(200).json(posts);
    })
    .catch(() => {
      return res.json(500).json({ error: err.code })
    })
})

app.delete('/deletePost', FBAuth, (req, res) => {
  const id = req.body.id;

  db
    .collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      db
        .collection(id)
        .listDocuments()
        .then(doc => {
          return doc.forEach(data => {
            data.delete()
          })
        })
        .then(() => {
          return res.status(200).json({ message: "Deleted Successfully" })
        })
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    })
})

exports.api = functions.https.onRequest(app);