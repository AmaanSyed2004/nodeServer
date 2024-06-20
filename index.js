const express = require("express");
const connectToDb = require("./config/db");
const router = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();  

app.use('/',router);
app.listen(3000, () => {
  console.log("3000");
});
