const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Verify the controller functions exist
if (!getAllPosts || typeof getAllPosts !== 'function') {
  throw new Error('getAllPosts controller is not properly imported');
}

// GET all posts
router.get('/', getAllPosts);

// GET single post
router.get('/:id', getPost);

// POST create new post (protected)
router.post('/', protect, createPost);

// PUT update post (protected)
router.put('/:id', protect, updatePost);

// DELETE post (protected)
router.delete('/:id', protect, deletePost);

module.exports = router;