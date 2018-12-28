const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

let iplData = require('./src/dataProject.js')
let matches = require("../data/matches.json")
let deliveries = require('../data/deliveries.json');


app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => res.send("Home Page!!"));
app.get('/luckyTeams', (req, res) => res.send(iplData.luckyTeams(matches)));
app.get('/strikeRate', (req, res) => res.send(iplData.strikeRate(deliveries)));
app.get('/deathOverEcon', (req, res) => res.send(iplData.deathOverEcon(deliveries)));
app.get('/scoreInFinal', (req, res) => res.send(iplData.scoreInFinal(matches, deliveries)))

app.listen(port, () => console.log(`I am  listening on port ${port}!`))

