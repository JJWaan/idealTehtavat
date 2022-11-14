const { Pool, Client } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'tenttisovellus_db',
    user: 'postgres',
    password: 'admin',
    port: 5432,
    idleTimeoutMillis: 8000,
    connectionTimeoutMillis: 2000,
    max: 20,
    // allowExitOnIdle: true,
});

const client = new Client({
    host: 'localhost',
    database: 'tenttisovellus_db',
    user: 'postgres',
    password: 'admin',
    port: 5432,
});

const postgrePool = () => pool;

// pool statistics, properties
const poolStats = async () => {
    console.log('# of total clients existing in pool:', pool.totalCount)
    console.log('# of total clients idle in pool:', pool.idleCount)
    console.log('# of queued requests:', pool.waitingCount)
};


module.exports = { postgrePool, poolStats,  };