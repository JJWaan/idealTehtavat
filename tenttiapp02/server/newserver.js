const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))

const cors = require('cors');
app.use(cors());

const port = 8080;

const funktiot = require('./newserverqueries');

app.listen(port, () => { console.log(`listening on port ${port}`); });
funktiot.poolStats();

// rajapinta postmanille
app.get('/', (request, response) => {
  response.send('jotain');
  console.log("jotain tapahtui")
});

// app.get('/', funktiot.getData);
// app.post('/', funktiot.addData);
// app.put('/', funktiot.updateData);
// app.delete('/', funktiot.delData);















// POST to db
// app.post('/', async (req, res) => {
//     await pool.query("INSERT INTO oma_db (nimi) VALUES ('stuffia')");
//     console.log("data written to db");
//     res.send('data written to db');
//     pool.end();
// });

  // Lisää backendiin, nimi-kolumniin (id tehdään pgAdmin:ssa)
//   const lisaaValue = async () => {
//     try {
//       let result = await pool.query("INSERT INTO tentti_backend (nimi) VALUES ('jokisen asia')")
//       console.log("insert (object) into backend:", result)
//       console.log("insert command:", result.command)
//       console.log("insert rowCount:", result.rowCount)
//     } catch (error) { console.log("insert into Err:", error) }
//     pool.end();
//   }
  // lisaaValue();