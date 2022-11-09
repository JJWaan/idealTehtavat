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
// now PORT is env.variable. proper way to assing
// ports to node apps. you should attempt to read value
// of a env.value (called PORT)
// otherwise use arbitrary number (8080) for a dev machine

const funktiot = require('./newserverqueries');

app.listen(port, () => { console.log(`listening on port ${port}`); });

funktiot.poolStats();

app.get('/', funktiot.getData);
app.get('/:id/', funktiot.getDataFromID);
app.post('/', funktiot.addData);
app.put('/:id', funktiot.updateData);
app.delete('/:id', funktiot.deleteData);