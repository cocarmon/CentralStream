const express = require('express');
const streamController = require('../controllers/streamController');

const router = express.Router();

router.get('/username', streamController.getUsername);

module.exports = router;
