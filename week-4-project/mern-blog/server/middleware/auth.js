const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const User = require('../models/User');

const authMiddleware = {
  protect: async (req, res, next) => {
    let token;
    
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Check for token in cookies (alternative approach)
    // token = req.cookies?.token;

    if (!token) {
      return next(new UnauthorizedError('Authentication required'));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user and attach to request
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return next(new UnauthorizedError('User no longer exists'));
      }

      next();
    } catch (err) {
      // Handle specific JWT errors
      if (err.name === 'TokenExpiredError') {
        return next(new UnauthorizedError('Token expired'));
      }
      if (err.name === 'JsonWebTokenError') {
        return next(new UnauthorizedError('Invalid token'));
      }
      next(new UnauthorizedError('Authentication failed'));
    }
  },

  authorize: (...roles) => {
    return (req, res, next) => {
      if (!req.user?.role) {
        return next(new UnauthorizedError('User role not found'));
      }
      
      if (!roles.includes(req.user.role)) {
        return next(
          new UnauthorizedError(
            `Role ${req.user.role} is not authorized to access this resource`
          )
        );
      }
      next();
    };
  }
};

module.exports = authMiddleware;