const fs = require('fs')
const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const winningPlayer = req.query.winningPlayer
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)

    try {
      if (!fs.existsSync('results.json')) {
        fs.closeSync(fs.openSync('results.json', 'w'));
        fs.writeFileSync("results.json", [])
      }
      const jsonData = await fs.promises.readFile('results.json', 'utf-8');
      let {results} = JSON.parse(jsonData);

      if (winningPlayer !== 'X & O')
        results = results.filter(result => result.winningPlayer === winningPlayer)
      if (startDate.toString() !== 'Invalid Date')
        results = results.filter(result => new Date(result.gameDate).getTime() >= startDate.getTime())
      if (endDate.toString() !== 'Invalid Date')
        results = results.filter(result => new Date(result.gameDate).getTime() <= endDate.getTime())

      return res.status(200).send( results );
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Error reading results.json' });
    }
  });

app.post("/", (req, res) => {
    const result = req.body.winInfo
    fs.readFile('results.json', 'utf8', (error, fileData) => {
        if (error) {
          console.error(error);
        } else {
          const dataFromFile = JSON.parse(fileData);
          dataFromFile.results.push(result);
          fs.writeFile('results.json', JSON.stringify(dataFromFile, null, 2), 'utf8', (err) => {
            if (error) {
              console.error(error);
            }
          });
        }
    });
    return res.status(200).send({ message: 'Result saved' });
});

app.listen(8080)