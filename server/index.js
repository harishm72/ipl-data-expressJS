const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

let iplData = require('./src/dataProject.js')

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => res.send("Home Page!!"));
app.get('/luckyTeams', (req, res) => res.send(iplData.luckyTeams));
app.get('/strikeRate', (req, res) => res.send(iplData.strikeRate));
app.get('/deathOverEcon', (req, res) => res.send(iplData.deathOverEcon));
app.get('/scoreInFinal', (req, res) => res.send(iplData.scoreinFinal))

app.listen(port, () => console.log(`I am  listening on port ${port}!`))

