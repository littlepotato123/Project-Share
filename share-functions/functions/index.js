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

// Commenting Posts

// Following User

// Getting Random Posts
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
      console.error(err);
    })
})

// Getting Popular Posts

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
      console.error(err);
    })
})

exports.api = functions.https.onRequest(app);