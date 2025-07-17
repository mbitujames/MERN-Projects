const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  )
}

export default Card