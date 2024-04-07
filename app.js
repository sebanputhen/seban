require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// const bodyParser = require("body-parser");
const port = process.env.PORT || 8082;
const app = express();
// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
/* use the body-parser middleware to parse JSON and URL-encoded data . UPDATE : Using  Express instead of Body Parser
 parse requests of content type - application/json
 app.use(bodyParser.json());*/
app.use(express.urlencoded({ extended: true }));
const forane = require("./routes/api/forane");

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send(`
    <h2>API's - Forane</h2>
    <ul>
        <li>
            <h3>Get all Foranes</h3>
            <span>https://tithe-backend.onrender.com/forane</span>
        </li>
        <li>
            <h3>Get a Forane by ID</h3>
            <span>https://tithe-backend.onrender.com/forane/:id</span>
        </li>
        <li>
            <h3>Create new Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/newforane </span>
            <span>Method : POST</span>
        </li>
        <li>
            <h3>Update a Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/:id</span>
            <span>Method : PUT </span>
        </li>
        <li>
            <h3>Delete a Forane</h3>
            <span>https://tithe-backend.onrender.com/forane/:id</span>
            <span>Method : DELETE </span>
        </li>
    </ul>
    `);
});

app.use("/forane", forane);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
