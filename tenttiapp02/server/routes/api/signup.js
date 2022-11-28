const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// bcrypt config:
const saltRounds = 10;

// Signup route
router.post("/", async (request, response, next) => {
    const { nimi, email, password } = request.body;
    let result;
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await pool.query(
            "INSERT INTO kayttaja (user_nimi, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id",
            [nimi, email, hashed]
        );
        console.log(`Query ${result.command} completed succesfully`);
        console.log(`Query made to: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
    } catch (error) {
        console.error(error);
        return next();
    }
    let token;
    try {
        token = jwt.sign(
            {   userId: result.rows[0].user_id,
                email: email,
                nimi: nimi
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.error(error)
        return next();
    }
    response.status(201).json({
        success: true,
        data: {
            userId: result.rows[0].user_id,
            email: email,
            nimi: nimi,
            token: token
        }
    });
});

// export
module.exports = router;