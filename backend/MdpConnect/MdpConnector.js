const mongoose = require('mongoose');
require("dotenv").config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Error", err);
  }
};

module.exports = connectDB;

