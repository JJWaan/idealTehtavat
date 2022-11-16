const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 8080;
// environment variable. commandline with
// export PORT=5000 (set PORT=5000 for windows)
// now PORT is env.variable.
// this is the proper way to assing ports.
// you should attempt to read value
// of a env.value (called PORT)
// otherwise use arbitrary number (8080) for a dev machine

// static page
// app.use(express.static('public'));

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = require('../config/databaseconfig');

//
// Signup
app.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    let result; 
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await pool.postgrePool().query(
            "INSERT INTO kayttaja (user_email, user_password) VALUES ($1,$2) RETURNING user_id", [email, hashed]);
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
    res.status(201).json({
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
app.post("/login", async (req, res, next) => {
    let { email, password } = req.body;
    let passwordMatch=false;
    let existingUser;
    try {
        // existingUser = await User.findOne({ email: email });
        let result = await pool.postgrePool().query("SELECT * FROM kayttaja WHERE user_email=$1", [email])
        existingUser = {
            password: result.rows[0].user_password,
            email: result.rows[0].user_email,
            id: result.rows[0].user_id
        };
        console.log(existingUser);
        passwordMatch = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        console.error(error);
        return next();
    }

    if (!passwordMatch) {
        console.error("Wrong details please check at once");
        return next();
    }

    let token;
    try {
    // Creating jwt token
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            "secretkeyappearshere",    //.env
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.log(error);
        return next();
    }
 
    res.status(200).json({
        success: true,
        data: {
        userId: existingUser.user_id,
        email: existingUser.user_email,
        token: token,
        },
    });
});

// Verifiointi func
const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1]; 
    //Authorization: 'bearer TOKEN'
    if(!token) {
        res.status(200).json({success: false, message: "Error: Token was not provided."});
    };
    //Decoding the token
    const decodedToken = jwt.verify(token,"secretkeyappearshere");
    req.decoded = decodedToken;
    next();
};

app.use(verifyToken) // Verifiointi tapahtuu tässä

app.get('/', (req, res) => {
    console.log(req.decoded)
    console.log("Palvelimeen tultiin kyselemään dataa")
    res.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
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

// (deprecated, not used anymore:)
// const funktiot = require('./newserverqueries');

// routes (deprecated, not used anymore)
// app.get('/', funktiot.getData);
// app.get('/:id/', funktiot.getData);
// app.post('/', funktiot.addData);
// app.put('/:id', funktiot.updateData);
// app.delete('/:id', funktiot.deleteData);

// app.post('/login', funktiot.loginPost);

// const auth = (request, response, next) => {
//     console.log("authed, this is a placeholder");
//     if (request.query.isAdmin === 'true') {
//         next();
//         return; // needed because "next()"
//         // next calls the next middleware
//     }
//     response.send('Not authorized')
// };
// init "auth()"
// app.use(auth);

// pool statistics
// const statsit = require('../config/databaseconfig')
// statsit.poolStats();

// logger function to log url
const logger = (request, response, next) => {
    console.log('Query made to:')
    console.log(`${request.protocol}://${request.get('host')}`);
    console.log(request.originalUrl);
    next();
};
app.use(logger);

// port variable listener
app.listen(port, () => { console.log(`server on port ${port}`); });