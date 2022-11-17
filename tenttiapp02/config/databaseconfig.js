const { Pool, Client } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'tenttisovellus_db',
    user: 'postgres',
    password: 'admin',
    port: 5432,
    idleTimeoutMillis: 8000,
    connectionTimeoutMillis: 2000,
    max: 8,
    // allowExitOnIdle: true,
});

const client = new Client({
    host: 'localhost',
    database: 'tenttisovellus_db',
    user: 'postgres',
    password: 'admin',
    port: 5432,
});

module.exports = {
    pool,
    client,
}