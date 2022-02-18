const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw createError.Unauthorized('Invalid token');

    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err, payload) => {
      if (err) {
        throw Error(err.message);
      }
      req.user = payload;
      next();
    });
    res.json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyAccessToken,
};
