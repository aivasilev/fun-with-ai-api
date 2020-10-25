const express = require('express');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('better-sqlite3')('fun-with-ai.db');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, saltRounds));
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageapi', (req, res) => {
  image.handleFaceApi(req, res);
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
