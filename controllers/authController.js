/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const config = require('../config/authConfig');

const User = db.user;

const findUser = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    console.log(err.message);
  }
};
exports.signup = async (req, res) => {
  try {
    // Create user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (user) {
      res
        .status(200)
        .json({ success: true, message: 'User Successfully Created!' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Internal Error Please Try Again' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await findUser(username);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Username or Password' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        success: false,
        message: 'Invalid Username or Password',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later',
    });
  }
};
