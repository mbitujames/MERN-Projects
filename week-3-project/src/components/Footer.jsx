import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const { theme } = useTheme()

  return (
    <footer className={`bg-white dark:bg-gray-900 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Task Manager App. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className={`text-sm hover:text-blue-600 transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className={`text-sm hover:text-blue-600 transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className={`text-sm hover:text-blue-600 transition-colors ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center md:text-left">
          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            Made with React, Tailwind CSS, and ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer