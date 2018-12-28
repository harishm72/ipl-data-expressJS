
let luckyTeams = (matchData) => {
    let result = matchData.reduce((lucky, match) => {
        lucky[match['toss_winner']] = lucky[match['toss_winner']] || 0;
        lucky[match['toss_winner']] += 1;
        return lucky;
    }, {})
    return result;
}
let strikeRate = (deliveryData) => {
    let result = deliveryData.reduce((strike, delivery) => {

        strike[delivery['batsman']] = strike[delivery['batsman']] || [parseInt(delivery['batsman_runs'], 10), 0];
        strike[delivery['batsman']] = [strike[delivery['batsman']][0] + parseInt(delivery['batsman_runs'], 10), strike[delivery['batsman']][1] + 1]
        return strike;
    }, {})

    Object.keys(result).map((key) => {
        result[key] = result[key].reduce((acc, data) => Number(((acc / data) * 100).toFixed(2)))
    })
    return result;

}
let deathOverEcon = (deliveryData) => {
    let result = deliveryData.filter((delivery) => Number(delivery['over']) > 16).reduce((ball, delivery) => {
        ball[delivery['bowler']] = ball[delivery['bowler']] || [Number(delivery['total_runs']), 0];
        let runs = ball[delivery['bowler']][0] + Number(delivery['total_runs']);
        let balls = ball[delivery['bowler']][1] + 1
        ball[delivery['bowler']] = [runs, balls]
        return ball
    }, {})

    Object.keys(result).map((key) => {
        result[key] = result[key].reduce((acc, data) => Number(((acc / (data / 6)).toFixed(2))))
    })

    return result;

}
let scoreinFinal = (matchdata, deliverydata) => {

    let finalId = matchdata.reduce((acc, data) =>{
        acc[data['season']] = acc[data['season']] || [data['id']]
        acc[data['season']].push(data['id'])
        return acc;
    }, {})
    Object.keys(finalId).map((key) =>{
        finalId[key] = Math.max(...finalId[key])
    })
    finalId = Object.values(finalId)
    
    let teams = matchdata.filter((match) => finalId.includes(match['id'])).reduce((teams, data) =>{
            teams[data['team1']] = teams[data['team1']] || 0;
                teams[data['team1']] += 1;
                teams[data['team2']] = teams[data['team2']] || 0;
                teams[data['team2']] += 1;
            return teams;
        },{})

    let scoreinFinal = deliverydata.filter((delivery) => (finalId.includes(Number(delivery['match_id'])) && Number(delivery['over']) < 7))
        .reduce((final, delivery) => {
            final[delivery['batting_team']] = final[delivery['batting_team']] || 0;
            final[delivery['batting_team']] += Number(delivery['total_runs']);
            return final;
        }, {})

        Object.keys(scoreinFinal).map((key) =>{
            scoreinFinal[key] = Number(((scoreinFinal[key] / teams[key])).toFixed(2))
        })
        return scoreinFinal
}

module.exports = {
    luckyTeams,
    strikeRate,
    deathOverEcon,
    scoreinFinal
};