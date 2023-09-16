import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post_routes.js";
import connectDB from "./db_connect/mongoose_connect.js"
import path from "path";
import { fileURLToPath } from 'url';

// ES6 does not providde direct support to __dirname.  This is an option for solving this issue.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname: ', __dirname)

// Routes
//const Post = require("./routes/post_routes");

const app = express();

app.use(express.json());

// Create a public folder to access the images.
app.use("/images", express.static(path.join(__dirname, "/images")));

// call dotenv and it will return an Object with a parsed key
dotenv.config();                                   

// Connect to Mongoose cluster and collections
connectDB();

app.use("/api/posts", postRoute);

app.listen("8000", () => {
    console.log('Express Server Has Started!')
});