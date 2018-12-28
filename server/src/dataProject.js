
let luckyTeams =  (matchData) =>{
    let result = matchData.reduce((lucky, match) => {
        lucky[match['toss_winner']] = lucky[match['toss_winner']] || 0;
        lucky[match['toss_winner']] += 1;
        return lucky;
    }, {})
    return result;
}
let strikeRate = (deliveryData) =>{
    let result = deliveryData.reduce((strike, delivery) => {

        strike[delivery['batsman']] = strike[delivery['batsman']] || [parseInt(delivery['batsman_runs'], 10), 0];
        strike[delivery['batsman']] = [strike[delivery['batsman']][0] + parseInt(delivery['batsman_runs'], 10), strike[delivery['batsman']][1] + 1]
        return strike;
    }, {})
    for (let key in result)
    result[key] = Number(((result[key][0] / result[key][1]) * 100).toFixed(2));
    return result;
}
let deathOverEcon = (deliveryData) =>{
    let result = deliveryData.filter((delivery) => Number(delivery['over']) > 16).reduce((ball, delivery) => {
        ball[delivery['bowler']] = ball[delivery['bowler']] || [Number(delivery['total_runs']), 0];
        ball[delivery['bowler']] = [ball[delivery['bowler']][0] + Number(delivery['total_runs']), ball[delivery['bowler']][1] + 1]
        return ball
    }, {})
    
    for (let key in result) {
        if (result[key][1] >= 36)
            result[key] = Number((result[key][0] / (result[key][1] / 6)).toFixed(2));
        else delete result[key];
    }
    return result;

}
let scoreinFinal = (matchdata, deliverydata) =>{

    let finalId = {};
for (let key in matchdata)
    finalId[matchdata[key]['season']] = matchdata[key]['id'];
finalId = Object.values(finalId);

let teams = {};

for (let key in matchdata) {
    if (finalId.includes(matchdata[key]['id'])) {
        teams[matchdata[key]['team1']] = teams[matchdata[key]['team1']] || 0;
        teams[matchdata[key]['team1']] += 1;
        teams[matchdata[key]['team2']] = teams[matchdata[key]['team2']] || 0;
        teams[matchdata[key]['team2']] += 1;
    }
}
let scoreinFinal = deliverydata.filter((delivery) => (finalId.includes(Number(delivery['match_id'])) && Number(delivery['over']) < 7))
    .reduce((final, delivery) => {
        final[delivery['batting_team']] = final[delivery['batting_team']] || 0 ;
        final[delivery['batting_team']] += Number(delivery['total_runs']);
        return final;
    }, {})

 for (let key in scoreinFinal)
     scoreinFinal[key] = Number((scoreinFinal[key] / teams[key]))//.toFixed(2))
    return scoreinFinal
}

module.exports = {
  luckyTeams, 
  strikeRate, 
  deathOverEcon,
  scoreinFinal
};