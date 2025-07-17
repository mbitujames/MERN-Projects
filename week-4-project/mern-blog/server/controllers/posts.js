const Post = require('../models/post');
const Category = require('../models/category');
const { NotFoundError, BadRequestError } = require('../utils/errors');

// Get all posts with pagination and filtering
exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = { isPublished: true };
    
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (!categoryDoc) throw new NotFoundError('Category not found');
      query.category = categoryDoc._id;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    next(err);
  }
};

// Get single post by ID or slug
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }]
    })
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('comments.user', 'name');

    if (!post) throw new NotFoundError('Post not found');

    // Increment view count
    await post.incrementViewCount();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Create new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;
    
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) throw new BadRequestError('Invalid category');

    const post = new Post({
      title,
      content,
      category,
      tags,
      isPublished,
      author: req.user.id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) throw new NotFoundError('Post not found');
    
    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
      throw new BadRequestError('Not authorized to update this post');
    }

    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) throw new BadRequestError('Invalid category');
      post.category = category;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new NotFoundError('Post not found');
    
    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
      throw new BadRequestError('Not authorized to delete this post');
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Add comment to post
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new NotFoundError('Post not found');

    const { content } = req.body;
    if (!content) throw new BadRequestError('Comment content is required');

    await post.addComment(req.user.id, content);
    res.json(post);
  } catch (err) {
    next(err);
  }
};