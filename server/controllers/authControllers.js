const User = require('../models/users.model');
const createError = require('http-errors');
const { createAccessToken } = require('../helpers/jwt_helpers');

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

    //create access and refresh tokens
    const accessToken = await createAccessToken(
      savedUser._id,
      savedUser.isAdmin
    );

    res.status(201).json(savedUser);
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

    res.status(200).json(user);
  } catch (err) {
    next(
      createError.InternalServerError(
        'Internal server error, Please try again later'
      )
    );
  }
};
