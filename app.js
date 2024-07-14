require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const port = process.env.PORT || 8082;
connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const forane = require("./routes/forane");
const parish = require("./routes/parish");
const auth = require("./routes/auth");
const koottayma = require("./routes/koottayma");
const family = require("./routes/family");
const person = require("./routes/person");

app.get("/", (req, res) => {
  res.send(`
  <span>Use Postman to test the API endpoints.</span>
    <ul>
        <h2>Authentication</h2>
        <li>
            <h3>Login</h3>
            <span>https://tithe-backend.onrender.com/auth/login</span><br>
        </li>
        <br>
        <span>After Login we get a string token as a response, add Authorization header to all the protected routes with value "Bearer tokenvalue" </span>
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
app.use("/auth", auth);
app.use("/forane", forane);
app.use("/parish", parish);
app.use("/koottayma", koottayma);
app.use("/family", family);
app.use("/person", person);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
