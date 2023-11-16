//connect to mongoose databse
// server\config\connection.js
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://sonianyenkan80:BKCFPV81@cluster0.4staqrz.mongodb.net/recipe-radar-db?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;
