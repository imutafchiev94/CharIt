const {Router} = require('express');

const router = Router();
const donationController = require('./donationController');
const targetController = require('./targetController');

router.use('/donation', donationController);
router.use('/target', targetController);

module.exports = router;