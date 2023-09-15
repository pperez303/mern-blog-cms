//const router = require("express").Router();
import express from "express"
import Post from "../mongoDB_models/PostModel.js";
//const Post = require("../mongoDB_models/PostModel");
const router = express.Router();
//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.username;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// module.exports = router;
export default router;
