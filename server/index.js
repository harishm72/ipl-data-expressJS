const express = require('express');
let mysql = require('mysql');


const app = express();
const path = require('path');
const port = 3000;

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: 'ipldata'
  });

app.use(express.static(path.join(__dirname, '../client')));
db.connect();
app.get('/', (req, res) => res.send("Home Page!!"));
app.get('/luckyTeams', (req, res) => {
    db.query("select toss_winner, count(*) as wins From matches GROUP BY toss_winner", (err, results) =>{
        let out = {};
        results.map((res) => { out[res['toss_winner']] = res['wins'] })
        res.send(out)
    })
});
app.get('/strikeRate', (req, res) => {
    db.query("select batsman, (sum(batsman_runs)/count(*))*100 as strike From deliveries GROUP BY batsman", (err, results) =>{
        let out ={}
        results.map((res) => {out[res['batsman']] = res['strike']})
      res.send(out)
      })
});
app.get('/deathOverEcon', (req, res) => {
    db.query("select bowler, (sum(total_runs)/(count(*)/6)) as runs From deliveries where over > 16 GROUP BY bowler;", (err, results) =>{
        let out ={}
        results.map((res) => {out[res['bowler']] = res['runs']})
      res.send(out)
    })
});
app.get('/scoreInFinal', (req, res) => {
    db.query("", (err, results) =>{
        res.send(out)
    })
});

app.listen(port, () => console.log(`I am  listening on port ${port}!`));