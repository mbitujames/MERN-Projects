// server.js - Starter Express server for Week 2 assignment

//TASK 1 - EXPRESS.JS SET UP

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

//TASK 4 - ERROR HANDLING
// Create custom error classes for different types of errors (e.g., NotFoundError, ValidationError)
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

//TASK 3 - MIDDLEWARE IMPLEMENTATION
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Custom logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
  next(); 
});


//Authentication middleware that checks for an API key in the request headers
// Middleware to check for a valid API key
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Look for the API key in the request headers

    if (apiKey === '12345') { // You can choose any key, like '12345'
        next(); // If valid, move to the next middleware or route
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
};


//Validation middleware
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (!name || !description || price == null || !category || typeof inStock !== 'boolean') {
        throw new ValidationError('Name is required');
    }

    next(); // Data is valid, continue to the route handler
};


// Apply authentication to all /api/products routes
app.use('/api/products', authenticate);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

//TASK 2 - RESTFUL API ROUTES

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// To get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find( p => p.id == req.params.id ); 
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (error) {
     next(error); 
  }
});


// To create a new product
app.post('/api/products', validateProduct, (req, res) => {
  try {
    const newProduct = { id: products.length + 1, name: req.body.name, description: req.body.description, price: req.body.price, category: req.body.category, inStock: req.body.inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
     next(error); 
  }

});


// To update an existing product
app.put('/api/products/:id', validateProduct, (req, res) => {
 try {
   const product = products.find( p => p.id == req.params.id );

   if (!product) throw new NotFoundError('Product not found');
   product.price = req.body.price;
   res.json(product);
 } catch (error) {
    next(error); 
 }
});


// To delete a product
app.delete('/api/products/:id', (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id == req.params.id);

    if (productIndex === -1) throw new NotFoundError('Product not found');

    products.splice(productIndex, 1);
    res.status(204).send();
  } catch (error) {
    next(error); 
  }
});

//TASK 5 - ADVANCED FEATURES

// 1. Filtering by category using query parameter
app.get('/api/products/filter', (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ error: 'Category query parameter is required' });
  }

  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});

// 2. Pagination support
app.get('/api/products/page', (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 2; // default to 2 items per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginated = products.slice(startIndex, endIndex);
  res.json({
    page,
    limit,
    total: products.length,
    products: paginated
  });
});

// 3. Search products by name
app.get('/api/products/search', (req, res) => {
  const keyword = req.query.q;
  if (!keyword) {
    return res.status(400).json({ error: 'Search query parameter "q" is required' });
  }

  const result = products.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  res.json(result);
});

// 4. Product statistics (e.g., count by category)
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
});



//Implement global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.name, message: err.message });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 