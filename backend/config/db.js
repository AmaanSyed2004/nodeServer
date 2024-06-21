const mongoose = require("mongoose");

async function connectToDb() {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to the database @" + conn.connection.host);
  } catch (e) {
    console.log(`Error occured: ${e}`);
  }
}
module.exports = connectToDb;
