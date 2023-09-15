import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post_routes.js";
import connectDB from "./db_connect/mongoose_connect.js"
//const Post = require("./routes/post_routes");

const app = express();

// call dotenv and it will return an Object with a parsed key
dotenv.config();                                   

// Connect to Mongoose cluster and collections
connectDB();

app.listen("8000", () => {
    console.log('it WORKS')
});