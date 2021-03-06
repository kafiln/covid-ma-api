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
  tested: transformField(actual.tested, old.tested),
  //TODO: Refactor this (include calculation in lib and persist in db)
  actives: transformField(
    actual.confirmed - actual.deaths - actual.recovered,
    old.confirmed - old.deaths - old.recovered
  ),
  negatives: transformField(actual.negatives, old.negatives),
  deaths: transformField(actual.deaths, old.deaths),
  regions: mergeRegions(actual.regions, old.regions),
});
const getLastStatistics = () =>
  Statistic.findOne({}, FIELDS_TO_HIDE, { sort: { lastUpdate: -1 } });

const save = (doc) => new Statistic(doc).save();

const getTwoLast = async () => {
  return await Statistic.find({}, FIELDS_TO_HIDE, {
    sort: { lastUpdate: -1 },
  })
    .limit(2)
    .then((data) => {
      const [actual, old] = data;
      return transformData(actual, old);
    });
};

module.exports = {
  getLastStatistics,
  getTwoLast,
  save,
};
