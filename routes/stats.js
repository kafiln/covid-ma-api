const router = require('express').Router();
const repo = require('../repositories/statisticsRepository');

router.get('/', async (req, res) => {
  try {
    const mostUpdated = await repo.getLastStatistic();
    if (!mostUpdated) {
      return res.status(404).json({ error: true, message: 'Not Found' });
    }

    return res.status(200).json(mostUpdated);
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
});

module.exports = router;
