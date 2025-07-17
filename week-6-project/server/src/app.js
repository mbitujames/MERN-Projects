const express = require('express');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());
app.use('/api/posts', postsRouter);

// Error handler (should be last)
app.use(errorHandler);

module.exports = app;