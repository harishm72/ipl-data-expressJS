// matches.csv  and deliveries.csv  file
let matches = require("../data/matches.json");
let deliveries = require("../data/deliveries.json");
let fs = require('fs');


// 1. Luckiest team
let luckyTeams = () => {

    let lucky = {}
    //to get the toss wins for each team
    for (let key in matches) {
        if (lucky.hasOwnProperty(matches[key]['toss_winner']))
            lucky[matches[key]['toss_winner']] += 1;
        else lucky[matches[key]['toss_winner']] = 1;
    }
    //  for (let key in matches) {
    //      lucky[matches[key]['toss_winner']] = lucky[matches[key]['toss_winner']] || 0;
    //      lucky[matches[key]['toss_winner']] += 1;
    //  }
    return lucky;
};
// 2. Strike rate of batsman
let strikeRate = () => {

    let strike = {}
    for (let key in deliveries) {
        if (!strike.hasOwnProperty(deliveries[key]['batsman']))
            strike[deliveries[key]['batsman']] = [parseInt(deliveries[key]['batsman_runs'], 10), 1];
        else strike[deliveries[key]['batsman']] = [(strike[deliveries[key]['batsman']][0] + parseInt(deliveries[key]['batsman_runs'])), (strike[deliveries[key]['batsman']][1] + 1)];
    }
    let strikeRate = {};
    for (let key in strike)
        strikeRate[key] = ((strike[key][0] / strike[key][1]) * 100).toFixed(2);

    return strikeRate;
};
// 3. performance of bowlers in the death overs(last 4 overs)
let deathOverEcon = () => {

    let deathBowl = {};
    for (let key in deliveries) {
        if (Number(deliveries[key]['over']) >= 17) {
            if (deathBowl.hasOwnProperty(deliveries[key]['bowler']))
                deathBowl[deliveries[key]['bowler']] += Number(deliveries[key]['total_runs'])
            else deathBowl[deliveries[key]['bowler']] = Number(deliveries[key]['total_runs'])
        }
    }
    return deathBowl;
};
// 4. runs scored by teams in power play (first 6 overs) in final matches in all seasons
let scoreInFinal = () => {
    let finalId = {};

    // gets match_ids of final matches -- the last matches in that season
    for (let key in matches)
        finalId[matches[key]['season']] = matches[key]['id'];
    // since we need only ids reassign 'finalId' variable to an array that has only 
    finalId = Object.values(finalId);

    let mostRuns = {};
    for (let key in deliveries) {
        if (finalId.includes(Number(deliveries[key]['match_id']))) {
            if (Number(deliveries[key]['over']) <= 6) {
                if (mostRuns.hasOwnProperty(deliveries[key]['batting_team']))
                    mostRuns[deliveries[key]['batting_team']] += Number(deliveries[key]['total_runs']);
                else mostRuns[deliveries[key]['batting_team']] = Number(deliveries[key]['total_runs'])
            }
        }
    }
    return mostRuns;
};


module.exports = {
    luckyTeams : luckyTeams, 
    strikeRate : strikeRate, 
    deathOverEcon : deathOverEcon, 
    scoreInFinal : scoreInFinal
};