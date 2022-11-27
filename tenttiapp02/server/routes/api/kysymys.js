const express = require('express');
const router = express.Router();
const { pool, client } = require('../../../config/databaseconfig');
const poolStats = require('../../midware/databasepoolstats');

// admin-boolean (in database) checker, jwt-token verifier
const isAdmin = require('../../midware/isadmin');
const verifyToken = require('../../midware/jwttokenverify');

//

// get all kysymys, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM kysymys";
        // const sqlCommand = `
        //     SELECT *
        //     FROM kysymys
        //     INNER JOIN tentti_kysymys_liitos
        //     ON kysymys.kysymys_id = tentti_kysymys_liitos.kysymyksen_id
        // `;
        let result = await pool.query(sqlCommand);
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err', error);
    }
    // pool.end(() => { console.log('pool ended') });
});

// get kysymys by id
router.get('/:id', async (request, response) => {
    const { id } = request.params;
        try {
            // const sqlCommand = "SELECT * FROM kysymys WHERE kysymys_id=($1)";
            const sqlCommand = `
                SELECT *
                FROM kysymys
                INNER JOIN tentti_kysymys_liitos
                ON kysymys.kysymys_id = tentti_kysymys_liitos.kysymyksen_id
                WHERE kysymys_id=($1)
            `;
            let result = await pool.query(sqlCommand, [id]);
            response.status(200).send(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.send('Caught error with query');
            console.error('err', error);
        }
    // postgrePool().end(() => { console.log('pool ended') })
});

// all post, put & del methods require jwt-token and admin rights:

// transactional. add new kysymys to kysymys-table && relation table (tentti_kysymys_liitos)
router.post('/', async (request, response) => {
    const { kysymys, tentti_id, pisteet } = request.body;
    const junanvessa = await pool.connect();
    console.log("vessahätä");
    console.log("vessahädän body:", request.body);
    try {
        await junanvessa.query('BEGIN');
            let sqlCommand = "INSERT INTO kysymys (kysymys_teksti) VALUES ($1) RETURNING kysymys_id";
            const result = await pool.query(sqlCommand, [kysymys]);
            const values = [tentti_id, result.rows[0].kysymys_id, pisteet];
            sqlCommand = "INSERT INTO tentti_kysymys_liitos (tentin_id, kysymyksen_id, kysymys_pisteet) VALUES ($1, $2, $3)";
            await pool.query(sqlCommand, values);
        await junanvessa.query('COMMIT');
        response.status(200).send(`Inserted '${request.body.kysymys}' to tentti_id # ${tentti_id}`);
    } catch (error) {
        await junanvessa.query('ROLLBACK');
            response.send('Caught error with query');
            console.error('err', error);
    } finally {
        junanvessa.release();
        console.log("vessahätä released");
    }
    poolStats();
    // pool.end(() => { console.log('pool ended') })
});

// update a single kysymys_teksti
router.put('/:id', verifyToken, isAdmin, async (request, response) => {
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
        response.send('Caught error with query');
        console.error('err', error);
    }
    // postgrePool().end(() => { console.log('pool ended') })
});

// delete data (kysymys) && (tentti_kysymys_liitos)
// jos kysymys poistetaan kysymys-taulusta, se poistetaan myös tentti_kysymys_liitos-taulusta.
router.delete('/:id', verifyToken, isAdmin, async (request, response) => {
    const { id } = request.params;
    const values = [id];
    const junanvessa = await pool.connect();
    console.log('Deleting data @ database, from Tables: kysymys, tentti_kysymys_liitos');
    try {
        await junanvessa.query('BEGIN');
            let sqlCommand = "DELETE FROM kysymys WHERE kysymys_id=($1)";
            await pool.query(sqlCommand, values);
            console.log(`Deleted kysymys id # ${id} from "kysymys"-table successfully`);

            sqlCommand = "DELETE FROM tentti_kysymys_liitos WHERE kysymyksen_id=($1)";
            await pool.query(sqlCommand, values);
        await junanvessa.query('COMMIT');
            response.status(201).send(`Deleted kysymys id # ${id} succesfully, from Tables: kysymys, tentti_kysymys_liitos `);
            console.log(`Deleted kysymys id # ${id} from "tentti_kysymys_liitos"-relationtable successfully`);
    }
    catch (error) {
        await junanvessa.query('ROLLBACK');
        response.send('Caught error with query, rolled back');
        console.error('err', error);
    }
    finally {
        junanvessa.release();
        console.log('Delete complete, PoolClient released');
    }
    poolStats();
    // pool.end(() => { console.log('pool ended') })
});

// delete only from kysymys-table:
// router.delete('/:id', verifyToken, isAdmin, async (request, response) => {
// router.delete('/:id', async (request, response) => {
//     const { id } = request.params;
//     const values = [id];
//     try {
//         const sqlCommand = "DELETE FROM kysymys WHERE kysymys_id=($1)";
//         await pool.query(sqlCommand, values);
//         response.status(201).send(`Deleted kysymys id # ${id} succesfully`);
//         console.log(`Deleted kysymys id ${request.params.id}`);
//     } catch (error) {
//         response.send('Caught error with query');
//         console.error('err', error);
//     }
//     // postgrePool().end(() => { console.log('pool ended') })
// });

// export
module.exports = router;