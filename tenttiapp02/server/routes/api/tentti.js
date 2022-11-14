const express = require('express');
const router = express.Router();
const pool = require('../../../config/databaseconfig');

// get all tentti, sql select from db
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM tentti"
        let result = await pool.postgrePool().query(sqlCommand)
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message)
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get tentti by id (works, but id validation is under construction)
router.get('/:id', async (request, response) => {
    const { id } = request.params
    // if (request.params.id) {
        try {
            const sqlCommand = "SELECT * FROM tentti WHERE tentti_id=($1)"
            let result = await pool.postgrePool().query(sqlCommand, [id])
            response.status(200).json(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.status(404).send(`Caught error with ${request.command} query:`, error.message)
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

// add data (tentti) (broken)
router.post('/', async (request, response) => {
    const { teksti } = request.body
    const values = [teksti]
    // console.log("res.body :", teksti);
    console.log("res.body type:", typeof teksti);
    try {
        const sqlCommand = "INSERT INTO tentti (tentti_nimi) VALUES ($1)"
        await pool.postgrePool().query(sqlCommand, values)
        response.status(201).send('Data inserted succesfully:', values);
        console.log('Data written');
    } catch (error) { response.send('Not found', error) }
    // pool.end(() => { console.log('pool ended') })
});

// update data (tentti)
router.put('/:id', async (request, response) => {
    const { teksti } = request.body
    const { id } = request.params
    try {
        if (!request.body.teksti || !request.params.id) {
            response.status(400).send('"teksti" is needed in the body, and id is required')
            return;
        }
        const sqlCommand = "UPDATE tentti SET teksti=($1) WHERE id=($2)"
        const values = [teksti, id]
        await pool.postgrePool().query(sqlCommand, values)
        response.status(201).send(`Data updated succesfully with '${teksti}' by id # ${id}`);
        console.log('Data updated');
    } catch (error) { response.status(404).send('Not found') }
    // pool.end(() => { console.log('pool ended') })
});

// delete data (tentti)
router.delete('/:id', async (request, response) => {
    const { id } = request.params
    const sqlCommand = "DELETE FROM tentti WHERE id=($1)"
    try {
        await pool.postgrePool.query(sqlCommand, [id])
        response.status(201).send(`Deleted id # ${id} succesfully`);
        console.log('Data deleted');
    } catch (error) { response.status(404).send('Not found') }
    // pool.end(() => { console.log('pool ended') })
});

// export
module.exports = router;