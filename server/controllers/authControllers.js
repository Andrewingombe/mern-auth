const User = require('../models/users.model');
const createError = require('http-errors');
const {
  createAccessToken,
  createRefreshToken,
} = require('../helpers/jwt_helpers');

//register a user
module.exports.register_post = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const doesExit = await User.findOne({ email: email });
    if (doesExit) throw createError.Conflict('User is already resgistered');

    const user = new User({
      username,
      email,
      password,
    });

    const savedUser = await user.save();

    // create access and refresh tokens
    const accessToken = await createAccessToken(
      savedUser.id,
      savedUser.isAdmin
    );
    const refreshToken = await createRefreshToken(
      savedUser.id,
      savedUser.isAdmin
    );

    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    next(
      createError.InternalServerError(
        'Internal server error, Please try again later'
      )
    );
  }
};

module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      throw createError.NotFound('User does not exist, Please register first');

    const isMatch = await user.valiadtePassword(password);
    if (!isMatch) throw createError.Unauthorized('Invalid email/password');

    //create access and refresh tokens
    const accessToken = await createAccessToken(user.id, user.isAdmin);
    const refreshToken = await createRefreshToken(user.id, user.isAdmin);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(
      createError.InternalServerError(
        'Internal server error, Please try again later'
      )
    );
  }
};
