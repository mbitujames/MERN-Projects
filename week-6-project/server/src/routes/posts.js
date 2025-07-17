const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = router;