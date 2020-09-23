const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const db = admin.firestore()

// Creating Posts
app.post('/createPost', (req, res) => {
  const newPost = {
    body: req.body.body,
    author: req.body.author,
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

// Login

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
app.get('/getAll', (req, res) => {
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
app.get('/getPopular', (req,res) => {
  db
    .collection('posts')
    .orderBy('likes', 'desc')
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