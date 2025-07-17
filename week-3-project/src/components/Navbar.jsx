import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Task Manager
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/tasks" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Tasks</Link>
          <Link to="/api" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">API Data</Link>
          <button onClick={toggleTheme} className="p-2">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
}