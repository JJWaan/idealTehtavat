// server:
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// use:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // static page
// midware:
const verifyToken = require('./midware/jwttokenverify');
const poolStats = require('./midware/databasepoolstats');
// port config:
const PORT = process.env.PORT || 8080;
// environment variable. commandline with 'export PORT=5000' || set PORT=5000 (for windows).
// now PORT is env.variable. this is the proper way to assing ports.
// attempt to read value of a env.value, otherwise use arbitrary number (8080) for a dev machine.

// test endpoint, after jwt-token verification:
// app.get('/', verifyToken, (request, response) => {
//     poolStats();
//     console.log('request info:', request.decoded)
//     console.log("Palvelimeen tultiin kyselemään dataa")
//     response.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
// });

app.get('/', (request, response) => {
    poolStats();
    console.log('request info:', request.decoded)
    console.log("Palvelimeen tultiin kyselemään dataa")
    response.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
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
// routes:
app.use('/signup', signup);
app.use('/login', login);
app.use('/tentti', tentti);
app.use('/kysymys', kysymys);
app.use('/vaihtoehto', vaihtoehto);
app.use('/kayttaja', kayttaja);

// port variable listener
app.listen(PORT, () => { console.log(`server on port ${PORT}`); });

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