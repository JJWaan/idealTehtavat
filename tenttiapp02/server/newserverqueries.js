const { Pool, Client } = require('pg');

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

// const client = new Client({
//     host: 'localhost',
//     database: 'oma_db',
//     user: 'postgres',
//     password: 'admin',
//     port: 5432,
// });

// client.connect(err => {
//     if (err) { console.error('client connection error', err.stack)
//     } else { console.log('client connected') }
// });

// pool statistics, properties
const poolStats = async () => {
    console.log('# of total clients existing in pool:', pool.totalCount)
    console.log('# of total clients idle in pool:', pool.idleCount)
    console.log('# of queued requests:', pool.waitingCount)
};

// get, sql select from db
const getData = async (request, response) => {
    if (request.params) {
        const { id } = request.params
        const sqlCommand = "SELECT * FROM oma_taulu WHERE id=($1)"
        try {
            let result = await client.query(sqlCommand, [id])
            response.status(200).send(result);
            console.log('Query complete');
        } catch (error) {
            response.status(404).send('Not found')
            console.log('Query failed:', error);
        }
        pool.end(() => { console.log('pool ended') })
        return;
    };

    const sqlCommand = "SELECT * FROM oma_taulu"
    try {
        let result = await client.query(sqlCommand)
        response.status(200).send(result);
        console.log('Query complete');
    } catch (error) {
        response.status(404).send('Not found')
        console.log('Query failed:', error);
    }
    pool.end(() => { console.log('pool ended') })
};

// add data
const addData = async (request, response) => {
    const { teksti } = request.body
    const sqlCommand = "INSERT INTO oma_taulu (teksti) VALUES ($1)"
    const values = [teksti]
    try {
        await pool.query(sqlCommand, values)
        response.status(201).send('Data inserted succesfully');
        console.log('Data written');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// update data
const updateData = async (request, response) => {
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('Bad request, "teksti" is needed')
            return;
        }
        const { teksti } = request.body
        const { id } = request.params
        const sqlCommand = "UPDATE oma_taulu SET teksti=($1) WHERE id=($2)"
        const values = [teksti, id]
        await pool.query(sqlCommand, values)
        response.status(201).send('Data updated succesfully');
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
    addData,
    updateData,
    deleteData,
};