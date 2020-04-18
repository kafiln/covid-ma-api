const Statistic = require('../models/Statistic');
const FIELDS_TO_HIDE = '-_id -regions._id -createdAt -updatedAt -__v';

const percentage = (actual, old) => (((actual - old) / old) * 100).toFixed(2);

const mergeRegions = (actual, old) => {
  const result = [];
  actual.forEach((a) => {
    const oldRegion = old.find((e) => e.name === a.name);
    result.push({
      name: a.name,
      actual: a.value,
      old: oldRegion.value,
      percentage: percentage(a.value, oldRegion.value),
    });
  });
  return result;
};

const transformField = (actual, old) => ({
  actual,
  old,
  percentage: percentage(actual, old),
});
const transformData = (actual, old) => ({
  lastUpdate: actual.lastUpdate,
  previousUpdate: old.lastUpdate,
  recovered: transformField(actual.recovered, old.recovered),
  confirmed: transformField(actual.confirmed, old.confirmed),
  negatives: transformField(actual.negatives, old.negatives),
  deaths: transformField(actual.deaths, old.deaths),
  regions: mergeRegions(actual.regions, old.regions),
});
const getLastStatistics = () =>
  Statistic.findOne({}, FIELDS_TO_HIDE, { sort: { createdAt: -1 } });

const save = (doc) => new Statistic(doc).save();

const getTwoLast = async () => {
  return await Statistic.find({}, FIELDS_TO_HIDE, {
    sort: { createdAt: -1 },
  })
    .limit(3)
    .then((data) => {
      const actual = data[0];
      const old = data[2];
      return transformData(actual, old);
    });
};

module.exports = {
  getLastStatistics,
  getTwoLast,
  save,
};
