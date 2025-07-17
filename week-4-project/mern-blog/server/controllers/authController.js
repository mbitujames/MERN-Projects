const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' } // Uses .env or defaults to 30 days
  );
};

// Example usage in login/register
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // 1. Check if user exists
    const user = await User.findOne({ email }).select('+password');
    
    // 2. Verify password
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid credentials');
    }
    
    // 3. Generate token
    const token = generateToken(user);
    
    // 4. Send response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (err) {
    next(err);
  }
};