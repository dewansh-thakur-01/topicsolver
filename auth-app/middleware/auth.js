const jwt = require('jsonwebtoken');
const store = require('../db/store');

/**
 * Middleware to protect dashboard and profile endpoints using JWT
 */
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing or invalid authentication token.'
    });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'nexus_default_secret';

  try {
    const decoded = jwt.verify(token, secret);
    const user = store.getUserByEmail(decoded.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User account not found.'
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Session expired or invalid token.'
    });
  }
};

module.exports = { requireAuth };
