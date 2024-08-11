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
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./config/swaggerOptions");

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
  res.status(200);
});
app.use("/auth", auth);
app.use("/forane", forane);
app.use("/parish", parish);
app.use("/koottayma", koottayma);
app.use("/family", family);
app.use("/person", person);
app.use(errorHandler);

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

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
