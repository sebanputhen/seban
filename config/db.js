const mongoose = require("mongoose");
mongoose.set("strictQuery", true, "useNewUrlParser", true);
DB_URL = "mongodb+srv://csedev:ISgZm2nyFulKTBWa@tithe.esemhum.mongodb.net/?retryWrites=true&w=majority&appName=tithe"

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;