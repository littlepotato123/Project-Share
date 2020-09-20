const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Creating Posts

// Sign Up

// Login

// Liking Posts

// Following User

// Getting Random Posts

// Getting Popular Posts

// Getting Leaderboard Users

// Getting Top 20 Users