const db = require('../models');

const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Finds the username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      // Ensures function exits
      return res.status(400).json({
        message: 'Username is already in use!',
      });
    }

    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (email) {
      return res.status(400).json({
        message: 'Email already in use!',
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    }); // Pass the error to the error handling middleware
  }
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
