const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
  // no need id because they are auto increment
});

module.exports = mongoose.model("Book", bookSchema);
