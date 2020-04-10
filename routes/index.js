const router = require('express').Router();
const stats = require('./stats.js');

router.get('/', stats);

module.exports = router;
