const express = require('express');
const streamController = require('../controllers/streamController');

const router = express.Router();

router.get('/getStreamInformation', streamController.streamInformation);
router.post('/createChatToken', streamController.createChatToken);
router.post('/releaseChannel', streamController.releaseChannel);

module.exports = router;

// Add Later
// router.post('/:id/createLike',streamController.createLike)
// router.put('/:id/edit',streamController.updateStreams)
// router.post('/:id/createTag',streamController.createTag)
