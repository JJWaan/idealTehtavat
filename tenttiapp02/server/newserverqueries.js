const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'oma_db',
    password: 'admin',
    port: 5432,
    idleTimeoutMillis: 8000,
    connectionTimeoutMillis: 2000,
    max: 20,
    // allowExitOnIdle: true,
});

// statistics, properties
const poolStats = async () => {
    console.log('# of total clients existing in pool:', pool.totalCount)
    console.log('# of total clients idle in pool:', pool.idleCount)
    console.log('# of queued requests:', pool.waitingCount)
};

// get, sql select from db
const getData = (request, response) => {
    console.log("ollaan getData funktiossa");
    try {
        pool.query("SELECT * FROM oma_taulu", (result) => {
            response.status(200).json(result.rows);
            console.log("resultti:", result.rows);
        });
    } catch { console.log("hmm", error); }
    pool.end(() => { console.log('pool ended') })
};

// update data
const updateData = async (request, response) => {
    try {
        pool.query("UPDATE oma_taulu SET boolean = '0' WHERE id=4", () => {
        response.status(201).send();
        });
    } catch { console.log("hmm", error); }
    pool.end(() => { console.log('pool ended') })
};

// add data
const addData = async (request, response) => {
    try {
        pool.query("INSERT INTO oma_taulu (teksti) VALUES 'uusi asia' WHERE id=4", () => {
        response.status(201).send();
        });
    } catch { console.log("hmm", error); }
    pool.end(() => { console.log('pool ended') })
};

// export
module.exports = {
    poolStats,
    getData,
    updateData,
    addData,
};