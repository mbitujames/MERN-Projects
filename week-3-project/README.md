# Week 3 React.js, JSX, and Tailwind CSS Assignment

## Overview
This project is a responsive React application built with Vite and styled using Tailwind CSS. It demonstrates modern front-end development practices including component architecture, state management with hooks, context for theme switching, and API integration. The app features a Task Manager and displays data fetched from a public API.

## Features
- **Reusable Components:** Button (primary, secondary, danger), Card, Navbar, Footer, and Layout.
- **Task Manager:** Add, complete, delete, and filter tasks (All, Active, Completed).
- **Hooks Usage:** useState, useEffect, useContext, and a custom useLocalStorage hook.
- **Theme Switcher:** Light/Dark mode using React Context and Tailwind's dark mode.
- **API Integration:** Fetches and displays data from JSONPlaceholder with loading, error states, pagination, and search.
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- **Tailwind Styling:** Uses utility classes for layout, spacing, typography, colors, and custom transitions.

## Project Structure
```
src/
  components/      # Reusable UI components (Button, Card, Navbar, Footer, Layout)
  context/         # ThemeContext for light/dark mode
  hooks/           # Custom hooks (useLocalStorage)
  pages/           # Main pages (Home, Tasks, API Data)
  App.jsx          # Main app component with routing
  index.js         # Entry point
public/
  index.html
tailwind.config.js # Tailwind CSS configuration
vite.config.js     # Vite configuration
README.md
```

## Setup Instructions
1. **Install Node.js** (v18 or higher recommended).
2. **Clone your repository:**
   ```
   git clone <your-repository-url>
   ```
3. **Navigate to the project directory:**
   ```
   cd week-3-react-js-assignment-mbitujames
   ```
4. **Install dependencies:**
   ```
   npm install
   ```
5. **Start the development server:**
   ```
   npm run dev
   ```

## Deployment
The project is Deployed in

**Deployed URL:** [[Live Link](https://plp-mern-stack-development.github.io/week-3-react-js-assignment-mbitujames/)]

## Expected Outcome
- Fully functional React app with multiple reusable components.
- State management using React hooks and context.
- API integration with loading, error handling, pagination, and search.
- Responsive design with Tailwind CSS and theme switching.
- Clean, organized code following React best practices.

## Screenshots


## Acknowledgments
- [React.js](https://react.dev/) for building the UI.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Vite](https://vitejs.dev/) for fast development and build tooling.
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for API data.

---
_This project is part of the Week 3 React.js, JSX, and Tailwind CSS assignment for mastering frontend