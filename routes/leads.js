const express = require('express');

const leadController = require('../controllers/leadController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, leadController.getLeads);
router.put('/:id', requireAuth, leadController.updateLeadStatus);

module.exports = router;
