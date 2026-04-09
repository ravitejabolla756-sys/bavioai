const express = require('express');

const webhooksController = require('../controllers/webhooksController');

const router = express.Router();

router.post('/twilio', webhooksController.twilio);
router.post('/exotel', webhooksController.exotel);

module.exports = router;
