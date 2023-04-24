const db = require('../models');

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Finds the username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'Username is already in use!',
      });
      return;
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((email) => {
      if (email) {
        res.status(400).json({
          message: 'Email already in use!',
        });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
