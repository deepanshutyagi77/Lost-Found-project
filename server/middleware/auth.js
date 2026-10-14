/**
 * JWT Authentication Middleware
 * Verifies the Bearer token sent in Authorization header.
 * Attaches decoded teacher payload to req.teacher.
 */

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * requireAuth — must be a valid logged-in teacher
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authentication required. Please log in as Faculty.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.teacher = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, error: 'Invalid token. Authentication failed.' });
  }
}

/**
 * optionalAuth — attach teacher if token present, but don't block
 * (used for routes that return extra data to teachers)
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.teacher = jwt.verify(token, JWT_SECRET);
    } catch (_) {
      req.teacher = null;
    }
  } else {
    req.teacher = null;
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
