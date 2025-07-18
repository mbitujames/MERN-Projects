# MERN Stack Deployment and DevOps Assignment

## Project Setup

This project contains a full MERN stack chat application with separate frontend and backend directories.

### Backend

- Express.js server with production-ready middleware:
  - Helmet for secure HTTP headers
  - CORS enabled
  - Morgan for logging
  - MongoDB connection with connection pooling
- Environment variables configured via `.env` file
- Basic error handling middleware
- User registration and login (returns existing user if username exists)
- Health check endpoint at `/health`
- Socket.io integration for real-time chat
- Support for chat rooms including general, private, and group chats
- Typing indicators via socket.io events

### Frontend

- React application created with Create React App
- Environment variables support for API URL
- Proxy setup for API requests during development
- Production build script included
- User login and logout functionality
- Real-time chat UI with message display per room
- Room management: join, leave, create rooms
- Typing indicators display
- Messages update immediately upon sending

## How to Run Locally

### Backend

1. Navigate to the `backend` directory
2. Copy `.env.example` to `.env` and update with your MongoDB URI and PORT
3. Install dependencies: `npm install`
4. Start the server in development mode: `npm run dev`

### Frontend

1. Navigate to the `frontend` directory
2. Copy `.env.example` to `.env` and update `REACT_APP_API_URL` if needed
3. Install dependencies: `npm install`
4. Start the React app: `npm start`
5. To create a production build: `npm run build`

## Testing

- Backend tests cover API endpoints and socket.io messaging
- Frontend tests cover login, message sending, and UI rendering
- Backend tests require a running MongoDB test instance
- Frontend tests currently have some network request issues; mocking recommended for full isolation

## Next Steps

- Continue with Task 2 to deploy the backend to a cloud platform
- Deploy the frontend to a static hosting service
- Set up CI/CD pipelines with GitHub Actions
- Implement monitoring and maintenance strategies

## Monitoring and Maintenance

- Health check endpoint available at `/health` for uptime monitoring
- Use external services like Sentry for error tracking
- Plan regular database backups and server updates
- Document deployment and rollback procedures in this README

## Notes

This setup fulfills Task 1 requirements for preparing the application for deployment, including real-time chat features and testing infrastructure.
