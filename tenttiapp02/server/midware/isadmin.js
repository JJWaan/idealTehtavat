const { pool } = require('../../config/databaseconfig');

const isAdmin = async (request, response, next) => {
    try {
        result = await pool.query("SELECT * FROM kayttaja WHERE user_email = $1 ", [request.decoded?.email])
        console.log('decoded:', result.rows);
        console.log("karvat");
        let admin = result.rows[0].isAdmin
        if (admin) { return next() } {
        response.status(401).send("no access!")
        }
    }
    catch (error) {
        response.status(500).send(error)
    }
}

module.exports = isAdmin;