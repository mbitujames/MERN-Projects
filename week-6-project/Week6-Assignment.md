# 🧪 Week 6: Testing and Debugging – Ensuring MERN App Reliability

## 🚀 Objective
Implement comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, while also learning debugging techniques to identify and fix common issues.

## 📂 Tasks

### Task 1: Setting Up Testing Environment
- Configure Jest as the testing framework for both client and server
- Set up testing utilities for React components (React Testing Library)
- Configure Supertest for API endpoint testing
- Create a separate test database for integration tests
- Implement test scripts in package.json for running different types of tests

### Task 2: Unit Testing
- Write unit tests for utility functions in both client and server
- Test React components in isolation using mocks for dependencies
- Implement tests for Redux reducers and actions (if applicable)
- Create tests for custom hooks in React
- Test Express middleware functions
- Achieve at least 70% code coverage for unit tests

### Task 3: Integration Testing
- Write tests for API endpoints using Supertest
- Test database operations with a test database
- Implement integration tests for React components that interact with APIs
- Test authentication flows
- Create tests for form submissions and data validation

### Task 4: End-to-End Testing
- Set up Cypress or Playwright for end-to-end testing
- Create tests for critical user flows (e.g., registration, login, CRUD operations)
- Test navigation and routing
- Implement tests for error handling and edge cases
- Create visual regression tests for UI components

### Task 5: Debugging Techniques
- Use logging strategies for server-side debugging
- Implement error boundaries in React
- Use browser developer tools for client-side debugging
- Create a global error handler for the Express server
- Implement performance monitoring and optimization

## 🧪 Expected Outcome
- A comprehensive test suite for a MERN stack application
- Well-documented testing strategies and methodologies
- High code coverage for critical application features
- Improved application reliability and stability
- Implementation of debugging tools and techniques

## 🛠️ Setup
1. Clone the starter code repository
2. Install dependencies for both client and server:
   ```
   # In the root directory
   npm run install-all
   ```
3. Set up the test database:
   ```
   # In the server directory
   npm run setup-test-db
   ```
4. Run the tests:
   ```
   # Run all tests
   npm test
   
   # Run only unit tests
   npm run test:unit
   
   # Run only integration tests
   npm run test:integration
   
   # Run only end-to-end tests
   npm run test:e2e
   ```

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Complete all the tasks in the assignment
4. Commit and push your code regularly to show progress
5. Include in your repository:
   - Complete test files for unit, integration, and end-to-end testing
   - Documentation of your testing strategy
   - Screenshots of test coverage reports
   - Examples of debugging techniques implemented
6. Your submission will be automatically graded based on the criteria in the autograding configuration
7. The instructor will review your submission after the autograding is complete 