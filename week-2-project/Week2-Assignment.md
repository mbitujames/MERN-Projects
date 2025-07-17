# 🚂 Week 2: Express.js – Server-Side Framework

## 🚀 Objective
Build a RESTful API using Express.js that implements standard CRUD operations, proper routing, middleware implementation, and error handling.

## 📂 Tasks

### Task 1: Express.js Setup
- Initialize a new Node.js project
- Install Express.js and required dependencies
- Create a basic Express server that listens on port 3000
- Implement a "Hello World" route at the root endpoint

### Task 2: RESTful API Routes
- Create a resource called `products` with the following fields:
  - `id` (unique identifier)
  - `name` (string)
  - `description` (string)
  - `price` (number)
  - `category` (string)
  - `inStock` (boolean)
- Implement the following RESTful routes:
  - `GET /api/products`: List all products
  - `GET /api/products/:id`: Get a specific product by ID
  - `POST /api/products`: Create a new product
  - `PUT /api/products/:id`: Update an existing product
  - `DELETE /api/products/:id`: Delete a product

### Task 3: Middleware Implementation
- Create a custom logger middleware that logs the request method, URL, and timestamp
- Implement a middleware to parse JSON request bodies
- Create an authentication middleware that checks for an API key in the request headers
- Add validation middleware for the product creation and update routes

### Task 4: Error Handling
- Implement global error handling middleware
- Create custom error classes for different types of errors (e.g., NotFoundError, ValidationError)
- Add proper error responses with appropriate HTTP status codes
- Handle asynchronous errors using try/catch blocks or a wrapper function

### Task 5: Advanced Features
- Implement query parameters for filtering products by category
- Add pagination support for the product listing endpoint
- Create a search endpoint that allows searching products by name
- Implement route for getting product statistics (e.g., count by category)

## 🧪 Expected Outcome
- A fully functional Express.js API with proper RESTful routes
- Well-structured middleware for logging, authentication, and validation
- Comprehensive error handling with appropriate status codes and messages
- Advanced features like filtering, pagination, and search

## 🛠️ Setup
1. Make sure you have Node.js installed (v18 or higher recommended)
2. Use the provided `server.js` file as a starting point
3. Install the required dependencies:
   ```
   npm install express body-parser uuid
   ```
4. For testing your API, you can use tools like Postman, Insomnia, or curl

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Add the following files to your repository:
   - All your project files (server.js, routes, middleware, etc.)
   - A `README.md` file with:
     - Instructions on how to run your server
     - Documentation of your API endpoints
     - Examples of requests and responses
   - A `.env.example` file showing required environment variables
4. Commit and push your changes to GitHub
5. Your submission will be automatically graded based on the criteria in the autograding configuration
6. The instructor will review your submission after the autograding is complete 