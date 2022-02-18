const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const createAccessToken = (id, isAdmin) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, isAdmin },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: '15m' },
      (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      }
    );
  });
};

const createRefreshToken = (id, isAdmin) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, isAdmin },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: '1y' },
      (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      }
    );
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
