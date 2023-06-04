const express = require('express');
const authController = require('../controllers/authController');
const { verifySignUp, authJwt } = require('../middleware');

const router = express.Router();

router.get('/authorize', [authJwt.verifyToken], (req, res) => {
  res.send(true);
});

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.signup,
);
router.post('/login', authController.login);

module.exports = router;
