const express = require('express');
const router = express.Router();
const pool = require('../../../config/databaseconfig');

// get all user
router.get('/', async (request, response) => {
    try {
        const sqlCommand = "SELECT * FROM kayttaja"
        let result = await pool.postgrePool().query(sqlCommand)
        response.status(200).send(result.rows);
        console.log(`Query ${result.command} completed succesfully`);
    } catch (error) {
        response.status(404).send(`Caught error with ${request.command} query:`, error.message)
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// get user by id
router.get('/:id', async (request, response) => {
    const { id } = request.params
        try {
            const sqlCommand = "SELECT * FROM kayttaja WHERE kayttaja_id=($1)"
            let result = await pool.postgrePool().query(sqlCommand, [id])
            response.status(200).json(result.rows);
            console.log(`Query ${result.command} complete for id ${request.params.id}`);
        } catch (error) {
            response.status(404).send(`Caught error with ${request.command} query:`, error.message)
            console.error('err:', error);
        }
});

// post add new user

// put update user by id

// delete remove user by id


// export
module.exports = router;