// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const { initializePassport } = require('./middleware/auth')

const app = express();

// parse json
app.use(bodyParser.json());

app.use(initializePassport)
app.use(cors())

// mongoose
mongoose.connect('mongodb://localhost/express-mongo-passport', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

app.use('/auth', require('./routes/auth'))
app.use('/bookmarks', require('./routes/bookmarks'))

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
