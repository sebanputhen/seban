const mongoose = require("mongoose");
mongoose.set("strictQuery", true, "useNewUrlParser", true);
DB_URL = process.env.MONGOBD_URL

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;