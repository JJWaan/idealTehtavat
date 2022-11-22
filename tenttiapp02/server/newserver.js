// server:
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// SSL:
const https = require('https');
const fs = require('fs');
// use:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // static page

// midware:
const verifyToken = require('./midware/jwttokenverify');
const isAdmin = require('./midware/isadmin');
const poolStats = require('./midware/databasepoolstats');
// const sendEmail = require('./midware/nodemailer');

// http port config:
// const PORT = process.env.PORT || 8080;

// http server:
// app.listen(PORT, () => { console.log(`http, server on port ${PORT}`); });

// https server:
https.createServer(
    {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
    },
    app
    )
    .listen(4000, () => {
    console.log('https, server at port 4000');
    poolStats();
});

//

// root endpoint, get:
app.get('/', (request, response)=> {
    response.send('Hello from express server.');
    poolStats();
});

// test mock endpoint, uses jwt-token verification:
app.get('/ver', verifyToken, (request, response) => {
    poolStats();
    console.log('request info:', request.decoded)
    console.log('jwt-token verification ok')
    response.send('This service requires JSON Web Token verification.')
});

// test mock endpoint, uses admin-boolean check:
app.post('/admintest', isAdmin, async (request, response) => {
    console.log('request info:', request.decoded)
    console.log('isAdmin ok')
    response.send('This service requires admin rights.')

    const { teksti } = request.body;
    const values = [teksti];
    try {
        const sqlCommand = "INSERT INTO tentti (tentti_nimi) VALUES ($1)";
        await pool.query(sqlCommand, values);
        response.status(201).send(`Data '${request.body.teksti}' inserted succesfully`);
    } catch (error) {
        response.status(500).send(`Caught error with ${request.command} query:`, error.message);
        console.error(error);
    }
});

// express router:
// auth files:
const signup = require('./routes/api/signup');
const login = require('./routes/api/login');
// exam-related files:
const tentti = require('./routes/api/tentti');
const kysymys = require('./routes/api/kysymys');
const vaihtoehto = require('./routes/api/vaihtoehto');
const kayttaja = require('./routes/api/kayttaja');
const { pool } = require('../config/databaseconfig');
// routes:
app.use('/signup', signup);
app.use('/login', login);
app.use('/tentti', tentti);
app.use('/kysymys', kysymys);
app.use('/vaihtoehto', vaihtoehto);
app.use('/kayttaja', kayttaja);

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