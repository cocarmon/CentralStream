const express = require('express');
const authController = require('../controllers/authController');
const { verifySignUp, authJwt } = require('../middleware');

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.get('/authorize', [authJwt.verifyToken], (req, res) => {
  res.send(true);
});

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.signup,
);
router.post('/signin', authController.signin);

module.exports = router;
