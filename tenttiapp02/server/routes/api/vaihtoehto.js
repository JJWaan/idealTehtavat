const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');

// get all vastaus, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM vastaus";
        let result = await pool.query(sqlCommand);
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get vastaus by id (works, id validation is under construction)
router.get('/:id', async (request, response) => {
    const { id } = request.params;
    // if (request.params.id) {
        try {
            const sqlCommand = "SELECT * FROM vastaus WHERE vastaus_id=($1)";
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
    // pool.end(() => { console.log('pool ended') })
});

// add data (a new vastaus with vastaus_nimi)
router.post('/', async (request, response) => {
    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO vastaus (vastaus_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
        // console.log(`Query ${result.command} complete`);
    } catch (error) {
        response.status(500).send(`'Something went wrong:', ${error.message}`);
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// update a single vastaus_kuvaus
router.put('/:id', async (request, response) => {
    const { teksti } = request.body;
    const { id } = request.params;
    const values = [teksti, id];
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('"teksti" is needed in the body, and id is required');
            return;
        }
        const sqlCommand = "UPDATE vastaus SET vastaus_kuvaus=($1) WHERE vastaus_id=($2)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log(`Query complete for id ${request.params.id}`);
    } catch (error) {
        response.status(404).send('You are in the wrong neighborhood, dawg');
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// delete data (vastaus)
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const values = [id];
    try {
        const sqlCommand = "DELETE FROM vastaus WHERE vastaus_id=($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Deleted vastaus id # ${id} succesfully`);
        console.log(`Deleted vastaus id # ${request.params.id}`);
    } catch (error) {
        response.status(404).send('Caught error');
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') });
});

// export
module.exports = router;