// calcStatsFromAPI.js
const { loadData } = require('./loadData');
const { calcStats } = require('./calcStats');

async function calcStatsFromAPI() {
  try {
    const data = await loadData();
    return calcStats(data);
  } catch (error) {
    console.error("Error in calcStatsFromAPI:", error);
    throw error;
  }
}

module.exports = { calcStatsFromAPI };