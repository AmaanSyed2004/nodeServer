// backend/index.js

const express = require("express");
const connectToDb = require("./config/db");
const routes = require("./routes/routes");
const app = express();
const cookieParser = require("cookie-parser");
const allowCors = require("./middleware/cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(cookieParser());
app.use(express.json());
app.use(allowCors);
app.use(express.urlencoded({ extended: true }));
connectToDb();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/", routes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
