const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login route
router.post("/", async (request, response, next) => {
    let { email, password } = request.body;
    let passwordMatch=false;
    let existingUser;
    try {
        let result = await pool.query("SELECT * FROM kayttaja WHERE user_email=$1", [email]);
        existingUser = {
            password: result.rows[0].user_password,
            email: result.rows[0].user_email,
            id: result.rows[0].user_id
        };
        console.log(`Query ${result.command} completed succesfully`);
        console.log(`Query made to: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
        passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log('pw match ok');
    } catch (error) {
        console.error(error);
        return next();
    }

    if (!passwordMatch) {
        response.send('Invalid password');
        console.error('Wrong details, please check');
        return next();
    }

    let token;
    try {
    // Creating jwt token
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            "secretkeyappearshere", //.env
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.error(error);
        return next();
    }
 
    response.status(200).json({
        success: true,
        kekkonen: {
            userId: existingUser.user_id,
            email: existingUser.user_email,
            token: token,
        }
    });
});

// export
module.exports = router;