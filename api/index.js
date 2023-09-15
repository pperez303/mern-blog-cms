import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post_routes.js";
//const Post = require("./routes/post_routes");

const app = express();

// call dotenv and it will return an Object with a parsed key
dotenv.config();                                   

// Connect to Mongoose cluster and collections
mongoose
  .connect(process.env.MONGO_URL, {})               // the uri parameter is made available the dotenv.config();
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

  // To handle errors after initial connection was established, you should listen for error events on the connection.
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Database"));

app.listen("8000", () => {
    console.log('it WORKS')
});