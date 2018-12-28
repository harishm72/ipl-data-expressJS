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

app.get('/', (req, res) => res.send("Home Page!!"));
app.get('/luckyTeams', (req, res) => {
    db.query("select toss_winner, count(*) as wins From matches GROUP BY toss_winner", (err, results) =>{
        results = results.reduce((acc, data) => { 
            acc[data['toss_winner']] = data['wins'] 
            return acc;
        }, {})
        res.send(results)
    })
});
app.get('/strikeRate', (req, res) => {
    db.query("select batsman, (sum(batsman_runs)/count(*))*100 as strike From deliveries GROUP BY batsman", (err, results) =>{
        results = results.reduce((acc, data) => { 
            acc[data['batsman']] = data['strike'] 
            return acc;
        }, {})
      res.send(results)
      })
});
app.get('/deathOverEcon', (req, res) => {
    db.query("select bowler, (sum(total_runs)/(count(*)/6)) as runs From deliveries where over > 16 GROUP BY bowler;", (err, results) =>{
        results = results.reduce((acc, data) => { 
            acc[data['bowler']] = data['runs'] 
            return acc;
        }, {})
      res.send(results)
      })
});
app.get('/scoreInFinal', (req, res) => {
    db.query("select batting_team, sum(total_runs)/count(distinct match_id) as runs from deliveries where match_id in (select max(id) from matches group by season) and over < 7 group by batting_team ", (err, results) =>{
        results = results.reduce((acc, data) => { 
            acc[data['batting_team']] = data['runs'] 
            return acc;
        }, {})
      res.send(results)
      })
});

app.listen(port, () => { 
    db.connect();
    console.log(`I am  listening on port ${port}!`)});