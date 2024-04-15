require('dotenv').config({path:'./config/.env'})
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8082;
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

const forane = require("./routes/api/forane");
const parish = require("./routes/api/parish");
// const auth = require("./routes/api/auth");
// const { authRequest } = require("./controllers/authController");

connectDB();

app.get("/", (req, res) => {
  res.send(`
    <ul>
        <h2>API's - Forane</h2>
        <li>
            <h3>Get all Forane</h3>
            <span>https://tithe-backend.onrender.com/forane</span>
        </li>
        <li>
            <h3>Get a Forane by ID</h3>
            <span>https://tithe-backend.onrender.com/forane/:foraneid</span>
        </li>
        <li>
            <h3>Create new Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/newforane </span>
            <span>Method : POST</span>
        </li>
        <li>
            <h3>Update a Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/:foraneid</span>
            <span>Method : PUT </span>
        </li>
        <li>
            <h3>Delete a Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/:foraneid</span>
            <span>Method : DELETE </span>
        </li>
        <br>
        <h2>Parish</h2>
        <li>
            <h3>Get all Parish under a Forane</h3>
            <span>https://tithe-backend.onrender.com/parish/forane/:foraneid</span>
        </li>
        <li>
            <h3>Get a Parish by ID</h3>
            <span>https://tithe-backend.onrender.com/parish/:parishid</span>
        </li>
        <li>
            <h3>Create new Parish</h3>
            <span>https://tithe-backend.onrender.com/parish/newparish </span>
            <span>Method : POST</span>
        </li>
        <li>
            <h3>Update a Parish</h3>
            <span>https://tithe-backend.onrender.com/parish/:parishid</span>
            <span>Method : PUT </span>
        </li>
        <li>
            <h3>Delete a Parish</h3>
            <span>https://tithe-backend.onrender.com/parish/:parishid</span>
            <span>Method : DELETE </span>
        </li>
    </ul>
    `);
});
// app.use("/auth", auth);
// app.use("/forane", authRequest, forane);
app.use("/forane", forane);
// app.use("/parish", authRequest, parish);
app.use("/parish", parish);


app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
