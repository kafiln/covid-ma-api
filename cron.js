const { all } = require('./scrapper');
const repo = require('./repositories/statisticsRepository');

const job = async () => {
  console.log('Starting the job at', new Date().toString());
  const newData = await all();

  const mostUptoDate = await repo.getLastStatistics();
  const noNeedToSave =
    mostUptoDate &&
    new Date(newData.lastUpdate).toString() ===
      new Date(mostUptoDate.lastUpdate).toString();

  if (noNeedToSave) {
    console.log('No new data');
    console.log('Retrying later');
  } else {
    // New data 🎉🎉
    const newRecord = await repo.save(newData);
    console.log('new record saved in db');
  }
};

module.exports = job;
