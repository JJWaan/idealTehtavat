const postgrePool = require('../../config/databaseconfig');

// db (postgres) pool statistics, properties
const poolStats = async () => {
    console.log('# of total clients existing in pool:', postgrePool().totalCount)
    console.log('# of total clients idle in pool:', postgrePool().idleCount)
    console.log('# of queued requests:', postgrePool().waitingCount)
};

module.exports = poolStats;