const express = require('express');
const router = express.Router();
const { pool, client } = require('../../../config/databaseconfig');
const poolStats = require('../../midware/databasepoolstats');

// get all kysymys, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM kysymys";
        let result = await pool.query(sqlCommand);
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} : ${error.message}`);
        console.error('err:', error);
    }
    pool.end(() => { console.log('pool ended') });
});

// get kysymys by id (id validation is under construction)
router.get('/:id', async (request, response) => {
    const { id } = request.params;
    // if (request.params.id) {
        try {
            const sqlCommand = "SELECT * FROM kysymys WHERE kysymys_id=($1)";
            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.status(404).send(`Caught error with ${request.command} query:`, error.message);
            console.error('err:', error);
        }
        // return;
    // }
    // else {
        // needs to check against a value if id exists
        // response.status(404).json({message: `No data with id of ${request.params.id}`})
    // }
    // postgrePool().end(() => { console.log('pool ended') })
});

// update a single kysymys_teksti
router.put('/:id', async (request, response) => {
    const { teksti } = request.body;
    const { id } = request.params;
    const values = [teksti, id];
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('"teksti" is needed in the body, and id is required in the url');
            return;
        }
        const sqlCommand = "UPDATE kysymys SET kysymys_teksti=($1) WHERE kysymys_id=($2)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log(`Query complete for id ${request.params.id}`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error('err', error);
    }
    // postgrePool().end(() => { console.log('pool ended') })
});

// delete data (kysymys)
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const values = [id];
    try {
        const sqlCommand = "DELETE FROM kysymys WHERE kysymys_id=($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Deleted kysymys id # ${id} succesfully`);
        console.log(`Deleted kysymys id ${request.params.id}`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error('err', error);
    }
    // postgrePool().end(() => { console.log('pool ended') })
});

// transactional. add new kysymys to kysymys-table && relation table (tentti_kysymys_liitos)
router.post('/', async (request, response) => {
    const { kysymys, tentti_id, pisteet } = request.body;
    const junanvessa = await pool.connect();
    console.log("vessahätä");
    console.log(request.body);
    try {
        await junanvessa.query('BEGIN');
            let sqlCommand = "INSERT INTO kysymys (kysymys_teksti) VALUES ($1) RETURNING kysymys_id";
            const result = await pool.query(sqlCommand, [kysymys]);
            const values = [tentti_id, result.rows[0].kysymys_id, pisteet];
            sqlCommand = "INSERT INTO tentti_kysymys_liitos (tentti_id, kysymys_id, kysymys_pisteet) VALUES ($1, $2, $3)";
            await pool.query(sqlCommand, values);
        await junanvessa.query('COMMIT');
        response.status(200).send(`Inserted '${request.body.kysymys}' to tentti_id # ${tentti_id}`);
    } catch (error) {
        await junanvessa.query('ROLLBACK');
            res.status(500).send(`Caught error with ${request.command} query:`, error.message);
            console.error('err:', error);
    } finally {
        junanvessa.release();
        console.log("vessahätä released");
    }
    poolStats();
    // pool.end(() => { console.log('pool ended') })
});

// export
module.exports = router;