const express = require("express");
const connectToDb = require("./config/db");
const router = require("./routes/routes");
const app = express();
const cookieParser= require('cookie-parser');
const allowCors = require("./middleware/cors");
app.use(cookieParser())
app.use(express.json());
app.use(allowCors)
app.use(express.urlencoded({ extended: true }));
connectToDb();  

app.use('/',router);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
