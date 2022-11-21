const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');

// admin-boolean (in database) checker, jwt-token verifier
const isAdmin = require('../../midware/isadmin');
const verifyToken = require('../../midware/jwttokenverify');

// notes: needs re-thinking; if user would need to be able to update his data (without admin rights) in the future.
//      with this current setup only admin can create, edit, delete data.

//

// get all kayttaja, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM kayttaja";
        let result = await pool.query(sqlCommand);
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get kayttaja by id
router.get('/:id', async (request, response) => {
    const { id } = request.params;
        try {
            const sqlCommand = "SELECT * FROM kayttaja WHERE kayttaja_id=($1)";
            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.status(404).send(`Caught error with ${request.command} query:`, error.message);
            console.error('err:', error);
        }
    // pool.end(() => { console.log('pool ended') })
});

// add data (a new kayttaja with kayttaja_nimi)
router.post('/', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO kayttaja (kayttaja_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
    } catch (error) {
        response.status(500).send(`'Something went wrong:', ${error.message}`);
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// update a single kayttaja_kuvaus
router.put('/:id', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const { id } = request.params;
    const values = [teksti, id];
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('"teksti" is needed in the body, and id is required');
            return;
        }
        const sqlCommand = "UPDATE kayttaja SET kayttaja_kuvaus=($1) WHERE kayttaja_id=($2)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log(`Query complete for id ${request.params.id}`);
    } catch (error) {
        response.status(404).send('You are in the wrong neighborhood, dawg');
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') });
});

// delete data (kayttaja)
router.delete('/:id', verifyToken, isAdmin, async (request, response) => {
    const { id } = request.params;
    const values = [id];
    try {
        const sqlCommand = "DELETE FROM kayttaja WHERE kayttaja_id=($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Deleted id # ${id} succesfully`);
        console.log(`Deleted kayttaja id ${request.params.id}`);
    } catch (error) {
        response.status(404).send('Caught error');
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') });
});

// export
module.exports = router;