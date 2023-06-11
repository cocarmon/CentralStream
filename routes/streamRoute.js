const express = require('express');
const streamController = require('../controllers/streamController');

const router = express.Router();

router.get('/information', streamController.streamInformation);
router.get('/tag', streamController.tagObject);
router.post('/chat-tokens', streamController.createChatToken);
router.post('/release-channel', streamController.releaseChannel);

module.exports = router;
