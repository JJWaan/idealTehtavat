const fs = require('fs');
const express = require('express'); // (npm i express)
const cors = require('cors') // (npm i cors)
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// GET from server
app.get('/', (res) => {
  const data = fs.readFileSync('tenttidata.json')
  console.log("get tenttidata")
  res.send(JSON.parse(data))
})

// POST , write to server file
app.post('/', (req, res) => {
  console.log("post to tenttidata")
  fs.writeFileSync('tenttidata.json', JSON.stringify(req.body))
  res.send('data written to file')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})