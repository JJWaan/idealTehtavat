const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tenttisovellus_db',
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
    const { id } = request.params
    if (request.params.id) {
        try {
            const sqlCommand = "SELECT * FROM tentti WHERE tentti_id=($1)"
            let result = await pool.query(sqlCommand, [id])
            response.status(200).json(result);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.status(404).send('Caught error with get/select query:', error)
            console.error(error.message);
        }
        pool.end(() => { console.log('pool ended') })
        return;
    }
    // else {
    //     response.status(400).json({message: `No data with id of ${request.params.id}`})
    // }
    try {
        const sqlCommand = "SELECT * FROM tentti"
        let result = await pool.query(sqlCommand)
        response.status(200).send(result);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send('Caught error with get/select query:', error)
        console.error(error.message);
    }
    pool.end(() => { console.log('pool ended') })
};

// add data
const addData = async (request, response) => {
    const { teksti } = request.body
    const sqlCommand = "INSERT INTO tentti (tentti_nimi) VALUES ($1) RETURNING *"
    const values = [teksti]
    try {
        await pool.query(sqlCommand, values)
        response.status(201).send('Data inserted succesfully:', values);
        console.log('Data written');
    } catch (error) { response.send('Not found', error) }
    pool.end(() => { console.log('pool ended') })
};

// update data
const updateData = async (request, response) => {
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('"teksti" is needed in the body')
            return;
        }
        const { teksti } = request.body
        const { id } = request.params
        const sqlCommand = "UPDATE tentti SET teksti=($1) WHERE id=($2)"
        const values = [teksti, id]
        await pool.query(sqlCommand, values)
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log('Data updated');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// delete data
const deleteData = async (request, response) => {
    const { id } = request.params
    const sqlCommand = "DELETE FROM tentti WHERE id=($1)"
    try {
        await pool.query(sqlCommand, [id])
        response.status(201).send(`Deleted id # ${id} succesfully`);
        console.log('Data deleted');
    } catch (error) { response.status(404).send('Not found') }
    pool.end(() => { console.log('pool ended') })
};

// login form placeholder
const loginPost = async (request, response) => {
    if (!request.header('x-auth-token')) {
        return response.status(400).send('No auth token')
    }

    if (request.header('x-auth-token') !== '1234') {
        return response.status(401).send('Unauthorized')
    }

    response.status().send('Logged in')
}

// export
// module.exports = {
//     poolStats,
//     getData,
//     addData,
//     updateData,
//     deleteData,
//     loginPost,
// };