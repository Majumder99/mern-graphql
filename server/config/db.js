// mongodb://localhost:27017

const mongoose = require("mongoose");

MONGO_URI = "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
