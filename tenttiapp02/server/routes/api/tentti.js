// get tentti, sql select from db
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

// add data (tentti)
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

// update data (tentti)
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

// delete data (tentti)
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