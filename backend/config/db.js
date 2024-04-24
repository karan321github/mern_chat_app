const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB IS CONNECTED TO :${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;

// const connectDB = () => {
//   mongoose.connect("mongodb://127.0.0.1:27017/MERN-CHAT-APP");
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error:"));
//   db.once("open", () => {
//     console.log("DATABASE CONNECTED");
//   });
// };


