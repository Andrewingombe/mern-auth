//register a user
module.exports.register_post = async (req, res, next) => {
  res.json('Client has been registered');
};

module.exports.login_post = async (req, res, next) => {
  res.json('User has been logged in');
};
