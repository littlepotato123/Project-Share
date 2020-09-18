const functions = require('firebase-functions');
const app = require('express')();

app.get('/sample', (req, res) => {
  res.send('This works')
})

exports.api = functions.https.onRequest(app);