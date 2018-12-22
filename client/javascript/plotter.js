//  let requirejs = require('requirejs');

//  let $ = requirejs('jquery');
//  console.log($.get('/luckyteams'))
 
 $(document).ready(() =>{

    $('#lucky').show(() => {
        var processed_json = new Array();
        $.get('/luckyTeams',  (data) => {
            // Populate series
            let result = [];
            for (let key in data)
                result.push([key, data[key]]);

            for (let i = 0; i < result.length; i++) {
                processed_json.push(result[i]);
            }
            console.log(processed_json)
            // draw chart
            $('#container').highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Toss Wins of Each Team over all the seasons of Ipl"
                },
                xAxis: {
                    type: 'category',
                    allowDecimals: false,
                    title: {
                        text: "Teams"
                    }
                },
                yAxis: {
                    title: {
                        text: "Toss Wins"
                    }
                },
                series: [{
                    name: 'Toss Wins',
                    data: processed_json
                }]
            });
        });
    });

$('#strikerate').click(() =>{
var processed_json = new Array();
        $.get('/strikeRate', function (data) {
            // Populate series
            let result = [];
            for (let key in data)
                result.push([key, parseInt(data[key], 10)]);
                result = result.slice(0, 10);
            for (let i = 0; i < result.length; i++) {
                processed_json.push(result[i]);
            }
            // draw chart
            $('#container').highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Strike Rate of Top 10 Batsmen"
                },
                xAxis: {
                    type: 'category',
                    allowDecimals: false,
                    title: {
                        text: "Players"
                    }
                },
                yAxis: {
                    title: {
                        text: "Strike Rate"
                    }
                },
                series: [{
                    name: 'Strike Rate',
                    data: processed_json
                }]
            });
        });
    });

$('#deathbowl').click(() =>{

var processed_json = new Array();
$.get('/deathOverEcon', (data) =>{

    let result = [];
            for (let key in data)
                result.push([key, data[key]]);

            for (let i = 0; i < result.length; i++) {
                processed_json.push(result[i]);
            }
            console.log(processed_json)
            // draw chart
            $('#container').highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Toss Wins of Each Team over all the seasons of Ipl"
                },
                xAxis: {
                    type: 'category',
                    allowDecimals: false,
                    title: {
                        text: "Bowlers"
                    }
                },
                yAxis: {
                    title: {
                        text: "Economy"
                    }
                },
                series: [{
                    name: 'Economy of Bowlers in Death Overs',
                    data: processed_json
                }]
            });
        });
    });

$('#finalruns').click(() =>{
let processed_json = new Array();
$.get('/scoreInFinal', (data) =>{

    let result = [];
            for (let key in data)
                result.push([key, parseInt(data[key], 10)]);
                result = result.slice(0, 10);
            for (let i = 0; i < result.length; i++) {
                processed_json.push(result[i]);
            }
            console.log(processed_json)
            // draw chart
            $('#container').highcharts({
                chart: {
                    type: "column"
                },
                title: {
                    text: "Runs Scored in Final Matches"
                },
                xAxis: {
                    type: 'category',
                    allowDecimals: false,
                    title: {
                        text: "Teams"
                    }
                },
                yAxis: {
                    title: {
                        text: "Runs"
                    }
                },
                series: [{
                    name: 'Runs Scored in Final Matches',
                    data: processed_json
                }]
            });
        });
});
 }

 )