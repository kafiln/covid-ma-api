const getStats = require('covid-ma');
const repo = require('./repositories/statisticsRepository');

const job = async () => {
  console.log('Starting the job at', new Date().toString());
  const newData = await getStats();

  const mostUptoDate = await repo.getLastStatistics();
  const noNeedToSave =
    mostUptoDate &&
    new Date(newData.lastUpdate).getTime() ===
      new Date(mostUptoDate.lastUpdate).getTime();

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
