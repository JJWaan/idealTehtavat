const fs = require('fs');

const express = require('express'); // (npm i express)
app.use(express.json());

const app = express();
const port = 8080;

// lokaalit hommat. tätä käytetään tällä periaatteella
// selaimen muisti(i)n lukemiseen && kirjoittamiseen

// GET, via server from (local file) tenttidata.json
app.get('/', (req, res) => {
  const data = fs.readFileSync('tenttidata.json')
  console.log("get tenttidata")
  res.send(data)
})

// POST, write via server to (local file) tenttidata.json
app.post('/', (req, res) => {
  console.log("post to tenttidata")
  fs.writeFileSync('tenttidata.json', JSON.stringify(req.body))
  // server response:
  res.send('data written to file')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})