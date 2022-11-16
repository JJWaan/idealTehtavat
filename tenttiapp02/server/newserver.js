// server:
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// auth:
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// midware:
const verifyToken = require('./midware/jwttokenverify');
const poolStats = require('./midware/databasepoolstats');
// use:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // static page
app.use(poolStats);

// bcrypt config:
const saltRounds = 10;
// port config:
const port = process.env.PORT || 8080;
// environment variable. commandline with 'export PORT=5000' || set PORT=5000 (for windows).
// now PORT is env.variable. this is the proper way to assing ports.
// attempt to read value of a env.value, otherwise use arbitrary number (8080) for a dev machine

// ---- ---- ---- ----
// middleware function calls:
// database statistics:
// poolStats();
// ---- ---- ---- ----

// this is here (for queries) only until auth-logic is moved to it's own file(s) separate from this file:
const postgrePool = require('../config/databaseconfig');

//
// Signup
app.post("/signup", async (request, response, next) => {
    const { email, password } = request.body;
    let result;
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await pool.postgrePool().query(
            "INSERT INTO kayttaja (user_email, user_password) VALUES ($1,$2) RETURNING user_id",
            [email, hashed]
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
            { userId: result.rows[0].user_id, email: email },
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
            token: token
        }
    });
});

//
// Login
app.post("/login", async (request, response, next) => {
    let { email, password } = request.body;
    let passwordMatch=false;
    let existingUser;
    try {
        let result = await postgrePool().query("SELECT * FROM kayttaja WHERE user_email=$1", [email]);
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
        data: {
        userId: existingUser.user_id,
        email: existingUser.user_email,
        token: token,
        }
    });
});

app.use(verifyToken); // jwt-token verification (midware)

// test endpoint, after verification:
app.get('/', (request, response) => {
    console.log(request.decoded)
    console.log("Palvelimeen tultiin kyselemään dataa")
    response.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
});

//
// express router routes:
const tenttiRoute = require('./routes/api/tentti');
const kysymysRoute = require('./routes/api/kysymys');
const vaihtoehtoRoute = require('./routes/api/vaihtoehto');
const kayttajaRoute = require('./routes/api/kayttaja');

app.use('/tentti', tenttiRoute);
app.use('/kysymys', kysymysRoute);
app.use('/vaihtoehto', vaihtoehtoRoute);
app.use('/kayttaja', kayttajaRoute);

// port variable listener
app.listen(port, () => { console.log(`server on port ${port}`); });

//
// ---- ---- ---- ----
//
// old stuff for the record:

// (deprecated, not used anymore:)
// const funktiot = require('./newserverqueries');

// routes (deprecated, not used anymore)
// app.get('/', funktiot.getData);
// app.get('/:id/', funktiot.getData);
// app.post('/', funktiot.addData);
// app.put('/:id', funktiot.updateData);
// app.delete('/:id', funktiot.deleteData);
// app.post('/login', funktiot.loginPost);