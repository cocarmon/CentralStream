const express = require('express');
const streamController = require('../controllers/streamController');

const router = express.Router();

router.get('/getStreamInformation', streamController.streamInformation);
router.get('/username', streamController.username);
router.get('/tag-object', streamController.tagObject);
router.post('/createChatToken', streamController.createChatToken);
router.post('/releaseChannel', streamController.releaseChannel);

module.exports = router;
