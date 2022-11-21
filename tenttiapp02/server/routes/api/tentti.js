const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');

// admin-boolean (in database) checker, jwt-token verifier
const isAdmin = require('../../midware/isadmin');
const verifyToken = require('../../midware/jwttokenverify');

//

// get all tentti, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM tentti";
        let result = await pool.query(sqlCommand);
        response.status(200).json(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.send.error
        response.send(`Caught error with ${request.command} query:`, error.message);
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get tentti by id
router.get('/:id', async (request, response) => {
    const { id } = request.params;
        try {
            const sqlCommand = "SELECT * FROM tentti WHERE tentti_id=($1)";
            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);

            // 
            // tähän alikyselyjä jotta saadaan liitos-taulusta tavaraa tiskiin
            //

        } catch (error) {
            response.status(404).send(`Caught error with ${request.command} query:`, error.message);
            console.error('err:', error);
        }
    // pool.end(() => { console.log('pool ended') })
});

// add data (a new tentti with tentti_nimi), needs admin rights
router.post('/', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO tentti (tentti_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
        // console.log(`Query ${result.command} complete`);
    } catch (error) {
        response.status(500).send(`Caught error with ${request.command} query:`, error.message);
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// update a single tentti_kuvaus
router.put('/:id', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const { id } = request.params;
    const values = [teksti, id];
    try {
        if (!request.body.teksti || request.body.teksti.length < 1) {
            response.status(400).send('"teksti" is needed in the body, and id is required');
            return;
        }
        const sqlCommand = "UPDATE tentti SET tentti_kuvaus=($1) WHERE tentti_id=($2)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log(`Query complete for id ${request.params.id}`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// delete data (tentti)
router.delete('/:id', verifyToken, isAdmin, async (request, response) => {
    const { id } = request.params;
    const values = [id];
    try {
        const sqlCommand = "DELETE FROM tentti WHERE tentti_id=($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Deleted id # ${id} succesfully`);
        console.log(`Deleted tentti id ${request.params.id}`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message);
        console.error(error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// export
module.exports = router;