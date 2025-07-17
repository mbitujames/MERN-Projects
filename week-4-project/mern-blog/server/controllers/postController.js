// controllers/postController.js
const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add other CRUD operations as needed