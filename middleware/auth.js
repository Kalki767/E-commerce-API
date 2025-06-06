const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Authentication required',
        data: null
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'User not found',
        data: null
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: 'Invalid token',
      data: null
    });
  }
};

module.exports = auth; 