const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))

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
app.use(express.static('public'));

const funktiot = require('./newserverqueries');

// logger function to log url
const logger = (request, response, next) => {
    console.log('Query made to:')
    console.log(`${request.protocol}://${request.get('host')}`);
    console.log('Original:', request.originalUrl);
    next();
};
// init middleware, "logger()"
app.use(logger);

const auth = (request, response, next) => {
    console.log("authed, this is a placeholder");
    if (request.query.isAdmin === 'true') {
        next();
        return; // needed because "next()"
        // next calls the next middleware
    }
    response.send('Not authorized')
};
// init "auth()"
app.use(auth);

// port variable listener
app.listen(port, () => { console.log(`server on port ${port}`); });

// init pool statistics
funktiot.poolStats();

// routes
app.get('/', funktiot.getData);
app.get('/:id/', funktiot.getData);
app.post('/', funktiot.addData);
app.put('/:id', funktiot.updateData);
app.delete('/:id', funktiot.deleteData);

app.post('/login', funktiot.loginPost)