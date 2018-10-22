const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
  // no need id because they are auto increment
});

module.exports = mongoose.model("Author", authorSchema);
