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
const getData = async (request, response) => {
    const sqlCommand = "SELECT * FROM oma_taulu"
    try {
        let stuff = await pool.query(sqlCommand)
        response.status(200).send(stuff);
        console.log('Query complete');
    } catch (error) {
        response.status(404).send('Not found')
        console.log('Query error:', error);
    }
    pool.end(() => { console.log('pool ended') })
};
//get based on id param
const getDataFromID = async (request, response) => {
    const { id } = request.params
    const sqlCommand = "SELECT * FROM oma_taulu WHERE id=($1)"
    try {
        let stuff = await pool.query(sqlCommand, [id])
        response.status(200).send(stuff);
        console.log('Query complete');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// add data
const addData = async (request, response) => {
    const { teksti } = request.body
    const sqlCommand = "INSERT INTO oma_taulu (teksti) VALUES ($1)"
    const values = [teksti]
    try {
        await pool.query(sqlCommand, values)
        response.status(201).send('okay');
        console.log('Data written');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// update data
const updateData = async (request, response) => {
    const { teksti } = request.body
    const { id } = request.params
    const sqlCommand = "UPDATE oma_taulu SET teksti=($1) WHERE id=($2)"
    const values = [teksti, id]
    try {
        await pool.query(sqlCommand, values)
        response.status(201).send('jee');
        console.log('Data updated');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// delete data
const deleteData = async (request, response) => {
    const { id } = request.params
    const sqlCommand = "DELETE FROM oma_taulu WHERE id=($1)"
    try {
        await pool.query(sqlCommand, [id])
        response.status(201).send('Deleted by id #');
        console.log('Data deleted');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// export
module.exports = {
    poolStats,
    getData,
    getDataFromID,
    updateData,
    addData,
    deleteData,
};