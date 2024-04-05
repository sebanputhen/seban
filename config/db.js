const mongoose = require("mongoose");
const db =
  "mongodb+srv://csedev:ISgZm2nyFulKTBWa@tithe.esemhum.mongodb.net/?retryWrites=true&w=majority&appName=tithe";


mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;