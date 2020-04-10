const Statistic = require('../models/Statistic');
const FIELDS_TO_HIDE = '-_id -regions._id -created_At -updatedAt -__v';

const getLastStatistics = () =>
  Statistic.findOne({}, FIELDS_TO_HIDE, { sort: { created_At: -1 } });

module.exports = {
  getLastStatistic: getLastStatistics,
};
