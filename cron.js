const getStats = require('covid-ma');
const repo = require('./repositories/statisticsRepository');
require('dotenv').config();

const job = async () => {
  const config = {
    timeOffset: process.env.TIME_OFFSET,
  };
  console.log('Starting the job at', new Date().toString());
  console.log('Overriding default config with', config);

  const newData = await getStats({ config });

  const mostUptoDate = await repo.getLastStatistics();
  console.log(mostUptoDate);
  const noNeedToSave = mostUptoDate && newData.tested === mostUptoDate.tested;

  if (noNeedToSave) {
    console.log('No new data');
    console.log('Retrying later');
  } else {
    // New data 🎉🎉
    console.log('New data 🎉🎉');
    const newRecord = await repo.save(newData);
    console.log('new record saved in db', newRecord);
  }
};

module.exports = job;
