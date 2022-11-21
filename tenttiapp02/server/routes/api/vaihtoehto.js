const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');

// admin-boolean (in database) checker, jwt-token verifier
const isAdmin = require('../../midware/isadmin');
const verifyToken = require('../../midware/jwttokenverify');

//

// get all vastaus, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM vastaus";
        let result = await pool.query(sqlCommand);
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get vastaus by id
router.get('/:id', async (request, response) => {
    const { id } = request.params;
        try {
            const sqlCommand = "SELECT * FROM vastaus WHERE vastaus_id=($1)";
            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.send('Caught error with query');
            console.error('err', error);
        }
    // pool.end(() => { console.log('pool ended') })
});

// all post, put & del methods require jwt-token and admin rights:

// add data (a new vastaus with vastaus_nimi)
router.post('/', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO vastaus (vastaus_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
        // console.log(`Query ${result.command} complete`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// update a single vastaus_kuvaus
router.put('/:id', verifyToken, isAdmin, async (request, response) => {
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
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// delete data (vastaus)
router.delete('/:id', verifyToken, isAdmin, async (request, response) => {
    const { id } = request.params;
    const values = [id];
    try {
        const sqlCommand = "DELETE FROM vastaus WHERE vastaus_id=($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Deleted vastaus id # ${id} succesfully`);
        console.log(`Deleted vastaus id # ${request.params.id}`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') });
});

// export
module.exports = router;