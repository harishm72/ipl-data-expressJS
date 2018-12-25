let matches = require("../data/matches.json");
let deliveries = require("../data/deliveries.json");

// 1
let luckyTeams = matches.reduce((lucky, match) => {
    lucky[match['toss_winner']] = lucky[match['toss_winner']] || 0;
    lucky[match['toss_winner']] += 1;
    return lucky;
}, {})
// 2
let strikeRate = deliveries.reduce((strike, delivery) => {

    strike[delivery['batsman']] = strike[delivery['batsman']] || [parseInt(delivery['batsman_runs'], 10), 0];
    strike[delivery['batsman']] = [strike[delivery['batsman']][0] + parseInt(delivery['batsman_runs'], 10), strike[delivery['batsman']][1] + 1]
    return strike;
}, {})
for (let key in strikeRate)
    strikeRate[key] = Number(((strikeRate[key][0] / strikeRate[key][1]) * 100).toFixed(2));

// 3
let deathOverEcon = deliveries.filter((delivery) => Number(delivery['over']) > 16).reduce((ball, delivery) => {
    ball[delivery['bowler']] = ball[delivery['bowler']] || [Number(delivery['total_runs']), 0];
    ball[delivery['bowler']] = [ball[delivery['bowler']][0] + Number(delivery['total_runs']), ball[delivery['bowler']][1] + 1]
    return ball
}, {})

for (let key in deathOverEcon) {
    if (deathOverEcon[key][1] >= 36)
        deathOverEcon[key] = Number((deathOverEcon[key][0] / (deathOverEcon[key][1] / 6)).toFixed(2));
    else delete deathOverEcon[key];
}
// 4th

let finalId = {};
for (let key in matches)
    finalId[matches[key]['season']] = matches[key]['id'];
finalId = Object.values(finalId);

let teams = {};

for (let key in matches) {
    if (finalId.includes(matches[key]['id'])) {
        teams[matches[key]['team1']] = teams[matches[key]['team1']] || 0;
        teams[matches[key]['team1']] += 1;
        teams[matches[key]['team2']] = teams[matches[key]['team2']] || 0;
        teams[matches[key]['team2']] += 1;
    }
}
let scoreinFinal = deliveries.filter((delivery) => (finalId.includes(Number(delivery['match_id'])) && Number(delivery['over']) <= 6))
    .reduce((final, delivery) => {
        final[delivery['batting_team']] = final[delivery['batting_team']] || Number(delivery['total_runs'])
        final[delivery['batting_team']] += Number(delivery['total_runs'])
        return final;
    }, {})

//console.log(Object.entries(scoreinFinal))

 for (let key in scoreinFinal)
     scoreinFinal[key] = Number((scoreinFinal[key] / teams[key]).toFixed(2))

module.exports = {
    luckyTeams: luckyTeams,
    strikeRate: strikeRate,
    deathOverEcon: deathOverEcon,
    scoreinFinal: scoreinFinal
};

//console.log(luckyTeams)
//console.log(strikeRate)
//console.log(deathOverEcon)
//console.log(scoreinFinal)