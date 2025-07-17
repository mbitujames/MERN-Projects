# MERN Blog Application

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application built for the Week 4 Integration Assignment. The project demonstrates seamless integration between front-end and back-end, including database operations, API communication, authentication, and state management.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Front-End Overview](#front-end-overview)
- [Screenshots](#screenshots)
- [Resources](#resources)

---

## Features

- RESTful API with Express.js and MongoDB
- React front-end with component architecture
- Full CRUD functionality for blog posts
- User authentication and authorization (JWT)
- Category management
- Comments on posts
- Pagination, search, and filtering
- Image upload for featured images
- Optimistic UI updates and error handling

---

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd mern-blog
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` in both `client/` and `server/` folders and fill in the required values.

### 3. Install Dependencies

#### Server

```sh
cd server
npm install
```

#### Client

```sh
cd client
npm install
```

### 4. Start Development Servers

#### Server

```sh
npm run dev
```

#### Client

```sh
npm run dev
```

The React app will run on `http://localhost:5173` and the API server on `http://localhost:5000`.

---

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Posts

- `GET /api/posts` - Get all posts (supports pagination, search, category filter)
- `GET /api/posts/:id` - Get a single post by ID or slug
- `POST /api/posts` - Create a new post (protected)
- `PUT /api/posts/:id` - Update a post (protected)
- `DELETE /api/posts/:id` - Delete a post (protected)
- `POST /api/posts/:id/comments` - Add a comment to a post (protected)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category (admin only)

### Example Request

```http
GET /api/posts?page=1&limit=10&category=tech&search=react
Authorization: Bearer <token>
```

### Error Handling

All errors return JSON with `status` and `message` fields.

---

## Front-End Overview

- **React Router** for navigation between views
- **React Context** for authentication state
- **React Query** for data fetching and caching
- **Material UI** for UI components
- **Custom Hooks** for posts, categories, and authentication
- **Protected Routes** for authenticated pages

### Main Components

- `HomePage` - List of posts with pagination
- `PostPage` - Single post view with comments
- `CreatePostPage` / `EditPostPage` - Form for creating/editing posts
- `LoginPage` / `RegisterPage` - Authentication forms
- `CategoriesPage` - List of categories
- `ProfilePage` - User profile and logout

---

## Screenshots

> _Include screenshots of your working application here!_
>
> - Home page with post list and pagination
> - Single post view with comments
> - Create/edit post form
> - Login/register pages
> - Category list

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

---

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your