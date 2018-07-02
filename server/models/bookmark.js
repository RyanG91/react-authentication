const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bookmark = new Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Bookmark', Bookmark);
