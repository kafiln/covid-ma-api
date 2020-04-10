const Statistic = require('../models/Statistic');
const FIELDS_TO_HIDE = '-_id -regions._id -createdAt -updatedAt -__v';

const getLastStatistics = () =>
  Statistic.findOne({}, FIELDS_TO_HIDE, { sort: { createdAt: -1 } });

const save = (doc) => new Statistic(doc).save();

module.exports = {
  getLastStatistics,
  save,
};
