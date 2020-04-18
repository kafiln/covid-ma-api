const router = require('express').Router();
const stats = require('./stats.js');

router.use('/', stats);

module.exports = router;
