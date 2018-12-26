let results = [{"toss_winner":"Chennai Super Kings","count":66},
{"toss_winner":"Deccan Chargers","count":41},
{"toss_winner":"Delhi Daredevils","count":69},
{"toss_winner":"Gujarat Lions","count":13},
{"toss_winner":"Kings XI Punjab","count":62},
{"toss_winner":"Kochi Tuskers Kerala","count":8},
{"toss_winner":"Kolkata Knight Riders","count":75},
{"toss_winner":"Mumbai Indians","count":83},
{"toss_winner":"Pune Warriors","count":20},
{"toss_winner":"Rajasthan Royals","count":62},
{"toss_winner":"Rising Pune Supergiant","count":6},
{"toss_winner":"Rising Pune Supergiants","count":5},
{"toss_winner":"Royal Challengers Bangalore","count":70},
{"toss_winner":"Sunrisers Hyderabad","count":34}];

let out = {};
results.map((res) => { out[res['toss_winner']] = res['count'] })

console.log(out)