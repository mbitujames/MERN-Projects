const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }
  
  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button