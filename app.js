require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
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
 const forane = require('./routes/api/forane')

// Connect Database
connectDB();

app.use('/forane',forane)

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;