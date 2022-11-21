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
        response.send('Caught error with query');
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get tentti (+ with it's contents (as in kysymykset & vastaukset)) by tentti id
router.get('/:id', async (request, response) => {
    const { id } = request.params;
        try {
            // const sqlCommand = "SELECT * FROM tentti WHERE tentti_id=($1)";

            const sqlCommand = `
                SELECT tentti_nimi, tentti_id, tentti_kuvaus
                FROM tentti
                INNER JOIN tentti_kysymys_liitos
                ON tentti.tentti_id = tentti_kysymys_liitos.tentin_id
                WHERE tentti_id=($1)
            `;

            // SELECT kysymys_id, kysymys_teksti
            // FROM kysymys
            // INNER JOIN tentti_kysymys_liitos
            // ON kysymys.kysymys_id = tentti_kysymys_liitos.kysymyksen_id
            // (where tentti_id is $1 huh?)

            // SELECT column_name(s)
            // FROM table1
            // INNER JOIN table2
            // ON table1.column_name = table2.column_name;

            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);

        } catch (error) {
            response.status(404).send('Caught error with query');
            console.error('err:', error);
        }
    // pool.end(() => { console.log('pool ended') })
});

// all post, put & del methods require jwt-token and admin rights:

// add data (a new tentti with tentti_nimi)
router.post('/', verifyToken, isAdmin, async (request, response) => {
    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO tentti (tentti_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
        // console.log(`Query ${result.command} complete`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err:', error);
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
            response.status(400).send('"teksti" is needed in the body, and id is required in url');
            return;
        }
        const sqlCommand = "UPDATE tentti SET tentti_kuvaus=($1) WHERE tentti_id=($2)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log(`Query complete for id ${request.params.id}`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err:', error);
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
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// export
module.exports = router;