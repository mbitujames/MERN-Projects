const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const User = require('../models/User'); // Add this import

exports.protect = async (req, res, next) => {
  let token;
  
  // Get token from header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new UnauthorizedError('Not authorized to access this route'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } catch (err) {
    next(new UnauthorizedError('Not authorized to access this route'));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return next(
        new UnauthorizedError(
          `User role ${req.user?.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};