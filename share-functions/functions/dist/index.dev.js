"use strict";

var functions = require('firebase-functions');

var admin = require('firebase-admin');

var app = require('express')();

admin.initializeApp();

var firebase = require('firebase');

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
var db = admin.firestore();

var FBAuth = function FBAuth(req, res, next) {
  var idToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res.status(403).json({
      error: 'Unauthorized'
    });
  }

  admin.auth().verifyIdToken(idToken).then(function (decodedToken) {
    req.user = decodedToken;
    return db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
  }).then(function (data) {
    req.user.handle = data.docs[0].data().handle;
    return next();
  })["catch"](function (err) {
    return res.status(403).json(err);
  });
}; // Checking if logged in


app.post('/getHandle', FBAuth, function (req, res) {
  return res.status(200).json({
    handle: req.user.handle
  });
}); // Creating Posts

app.post('/createPost', FBAuth, function (req, res) {
  var newPost = {
    body: req.body.body,
    author: req.user.handle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    title: req.body.title,
    category: req.body.category,
    likes: 0
  };
  db.collection('posts').add(newPost).then(function (doc) {
    res.json({
      message: "".concat(doc.id, " has been created successfully")
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'something went wrong'
    });
    console.error(err);
  });
}); // Sign Up

var isEmpty = function isEmpty(string) {
  if (string.trim() === '') return true;else return false;
};

var isEmail = function isEmail(email) {
  var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;else return false;
};

app.post('/signup', function (req, res) {
  var newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle
  };
  var errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (isEmail(newUser.email) == false) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match';
  if (isEmpty(newUser.userHandle)) errors.userHandle = 'Must not be empty';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  var idToken;
  var userId;
  db.doc("/users/".concat(newUser.userHandle)).get().then(function (doc) {
    if (doc.exists) {
      return res.status(400).json({
        handle: 'This handle already exists'
      });
    } else {
      return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
  }).then(function (data) {
    userId = data.user.uid;
    return data.user.getIdToken();
  }).then(function (token) {
    idToken = token;
    var userCred = {
      handle: newUser.userHandle,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId: userId,
      supporters: 0
    };
    return db.doc("/users/".concat(newUser.userHandle)).set(userCred);
  }).then(function () {
    return res.status(201).json({
      idToken: idToken
    });
  })["catch"](function (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).json({
        email: 'Email is already in use'
      });
    } else {
      res.status(500).json({
        error: err.code
      });
    }
  });
}); // Login

app.post('/login', function (req, res) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };
  var errors = {};
  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';
  if (Object.keys(errors).length > 0) return res.json(errors);
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (data) {
    return data.user.getIdToken();
  }).then(function (idToken) {
    return res.json({
      idToken: idToken
    });
  })["catch"](function (err) {
    if (err.code === 'auth/wrong-password') {
      return res.status(403).json({
        general: 'Wrong Credentials, please try again'
      });
    } else {
      res.status(500).json({
        error: err.code
      });
    }
  });
}); // Message User

app.post('/messageUser', FBAuth, function (req, res) {
  var message = {
    message: req.body.message,
    author: req.user.handle
  };
  db.collection(req.body.uid).add(message).then(function (doc) {
    return res.status(201).json({
      message: "".concat(doc.id, " successfully created")
    });
  })["catch"](function (err) {
    return res.status(500).json({
      error: 'Error Occured'
    });
  });
}); // Liking Posts

app.post('/likePost', function (req, res) {
  var changedPost = {
    body: req.body.body,
    author: req.body.author,
    title: req.body.title,
    category: req.body.category,
    likes: req.body.likes + 1
  };
  db.collection('posts').doc(req.body.id).set(changedPost).then(function () {
    res.json({
      message: 'successfully liked'
    });
  })["catch"](function (err) {
    res.status(301).json({
      error: 'Something went wrong'
    });
  });
}); // Unlike Posts

app.post('/unlikePost', function (req, res) {
  var changedPost = {
    body: req.body.body,
    author: req.body.author,
    title: req.body.title,
    category: req.body.category,
    likes: req.body.likes
  };
  db.collection('posts').doc(req.body.id).set(changedPost).then(function () {
    res.json({
      message: 'successfully unliked'
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Commenting Posts

app.post('/createComment', FBAuth, function (req, res) {
  var id = req.body.id;
  var newComment = {
    body: req.body.body,
    author: req.user.handle,
    createdAt: new Date().toISOString()
  };
  db.collection("".concat(id)).add(newComment).then(function (doc) {
    return res.status(200).json({
      message: "".concat(doc.id, " created and commented")
    });
  })["catch"](function (err) {
    return res.status(500).json({
      error: err.code
    });
  });
}); // Getting Comments

app.post('/getComment', function (req, res) {
  db.collection(req.body.id).get().then(function (data) {
    var comments = [];
    data.forEach(function (doc) {
      comments.push(doc.data());
    });

    if (comments.length > 0) {
      return res.status(201).json(comments);
    } else {
      return res.status(403).json({
        error: 'Could not find post'
      });
    }
  })["catch"](function (err) {
    return res.json({
      error: err.code
    });
  });
}); // Gaining Supporters

app.post('/followUser', function (req, res) {
  var supporters = req.body.supporters + 1;
  var account = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userld: req.body.userld
  };
  db.collection('supporters').doc(req.body.id).set(changeNumOfSupporters).then(function () {
    res.json({
      message: 'successfully followed'
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Losing Supporters

app.post('/unfollowUser', function (req, res) {
  var supporters = req.body.supporters - 1;
  var account = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAT,
    userld: req.body.userld
  };
  db.collection('supporters').doc(req.body.id).set(changeNumOfSupporters).then(function () {
    res.json({
      message: 'successfully unfollowed'
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Messaging User

app.post('/messageUser', function (req, res) {
  var newMessage = {
    message: req.body.message
  };
  db.collection(req.body.id).add(newMessage).then(function (doc) {
    res.status(201).json({
      message: "".concat(doc.id, " messaged")
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: err.code
    });
  });
}); // Getting Messaging User

app.post('/getMessages', function (req, res) {
  db.collection(req.body.id).limit(10).get().then(function (data) {
    var messages = [];
    data.forEach(function (doc) {
      messages.push(doc.data());
    });
    return res.status(200).json(messages);
  })["catch"](function (err) {
    res.status(500).json({
      error: err.code
    });
  });
}); // Following User

app.post('/followUser', function (req, res) {
  var supporters = req.body.supporters + 1;
  var newUser = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userId: req.body.userId
  };
  db.collection('users').doc(req.body.handle).set(newUser).then(function () {
    return res.status(201).json({
      message: 'successfully followed'
    });
  })["catch"](function () {
    return res.status(500).json({
      error: err.code
    });
  });
}); // Unfollowing User

app.post('/unfollowUser', function (req, res) {
  var supporters = req.body.supporters - 1;
  var newUser = {
    supporters: supporters,
    handle: req.body.handle,
    email: req.body.email,
    createdAt: req.body.createdAt,
    userId: req.body.userId
  };
  db.collection('users').doc(req.body.handle).set(newUser).then(function () {
    return res.status(201).json({
      message: 'successfully unfollowed'
    });
  })["catch"](function () {
    return res.status(500).json({
      error: err.code
    });
  });
}); // Getting Random Posts => Home Page

app.get('/getHome', function (req, res) {
  db.collection('posts').get().then(function (data) {
    var posts = [];
    data.forEach(function (doc) {
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
      });
    });
    return res.json(posts);
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Getting Popular Posts

app.get('/getPopular', function (req, res) {
  db.collection('posts').orderBy('likes', 'desc').limit(20).get().then(function (data) {
    var posts = [];
    data.forEach(function (doc) {
      posts.push({
        postId: doc.id,
        body: doc.data().body,
        userHandle: doc.data().userHandle,
        createdAt: doc.data().createdAt,
        author: doc.data().author,
        likes: doc.data().likes,
        category: doc.data().category,
        title: doc.data().title
      });
    });
    return res.json(posts);
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Getting Leaderboard Users

app.get('/leaderboard', function (req, res) {
  db.collection('users').orderBy('supporters', 'desc').limit(10).get().then(function (data) {
    var users = [];
    data.forEach(function (doc) {
      users.push(doc.data());
    });
    return res.json(users);
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  });
}); // Creating Category

app.post('/newCategory', function (req, res) {
  var newCategory = {
    title: req.body.title,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };
  db.collection('categories').add(newCategory).then(function (doc) {
    res.json({
      message: "".concat(doc.id, " created successfully")
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Error Occured'
    });
  });
}); // Getting All Categories

app.get('/getCategories', function (req, res) {
  db.collection('categories').get().then(function (data) {
    var categories = [];
    data.forEach(function (doc) {
      categories.push({
        categoryId: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt
      });
    });
    res.json(categories);
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Error occured'
    });
  });
}); // Deleting Posts

app.post('/deletePost', FBAuth, function (req, res) {
  var id = req.body.id;
  db.collection('posts').doc(id).get().then(function (doc) {
    if (req.user.handle == doc.data().author) {
      db.collection('posts').doc(id)["delete"]().then(function () {
        res.json({
          message: 'Post deleted'
        });
      })["catch"](function (err) {
        res.status(500).json({
          error: 'Error occured'
        });
      });
    } else {
      res.status(403).json({
        error: 'Not Logged in to correct user'
      });
    }
  });
}); // Deleting User

app.post('/deleteUser', function (req, res) {
  var user = firebase.auth().currentUser;

  if (user == null) {
    res.status(500).json({
      error: 'Not logged In'
    });
  }

  user["delete"]().then(function () {
    res.status(202).json({
      message: 'Successfully Deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      error: 'Error Occured'
    });
  });
}); // Get User

app.post('/getUser', function (req, res) {
  var userHandle = req.body.userHandle;
  db.collection('users').doc(userHandle).get().then(function (doc) {
    return res.status(200).json({
      user: doc.data()
    });
  })["catch"](function (err) {
    return res.status(500).json({
      error: 'Could not find user'
    });
  });
}); // Get All User's Posts

app.post('/getUserPosts', function (req, res) {
  var authorName = req.body.user;
  db.collection('posts').where('author', 'in', authorName).get().then(function (data) {
    if (data.empty) {
      return res.status(404).json({
        message: 'user has no posts'
      });
    } else {
      return res.status(201).json(data);
    }
  })["catch"](function () {
    return res.json(500).json({
      error: err.code
    });
  });
});
exports.api = functions.https.onRequest(app);