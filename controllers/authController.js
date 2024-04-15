const Admin = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privatekey =
  "b21210fedcb8b8ea8e0a7e337aebf5496aea278e526f067042eed1dff691d000";

function authRequest(req, res, next) {
  const token = req.cookies.jwttoken;
  if (!token) return res.sendStatus(401)
  jwt.verify(token, privatekey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = user;
    console.log(user.name);
    next();
  });
}

async function refresh(req,res,next)
{

}

async function Signup(req, res, next) {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newadmin = new Admin(req.body);
    await newadmin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An Erorr Occured during Signup" });
  }
}

async function Login(req, res, next) {
  try {
    const user = await Admin.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const jwttoken = jwt.sign(
      { userId: user._id, name: user.name },
      privatekey,
      {
        expiresIn: "15m",
      }
    );
    res.cookie("jwttoken", jwttoken, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });
    console.log(`${user.name} logged in at ${new Date().toISOString()}`);
    return res.status(200).json({ user, message: "Logged In Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An Error Occurred during Login" });
  }
}

module.exports = { Signup, Login, authRequest };
