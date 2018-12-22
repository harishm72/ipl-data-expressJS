
window.onload = () => {
    document.getElementById('lucky').addEventListener('click', () => {
        fetch('http://localhost:3000/luckyTeams')
            .then(res => res.json())
            .then(data => {
                let result = [];
                for (let key in data)
                    result.push([key, data[key]]);

                var processed_json = new Array();

                for (let i = 0; i < result.length; i++)
                    processed_json.push(result[i]);

                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'bar'
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


            })
    })

    document.getElementById('strikerate').addEventListener('click', () => {
        fetch('http://localhost:3000/strikeRate')
            .then(res => res.json())
            .then(data => {
                let result = [];
                for (let key in data)
                    result.push([key, parseInt(data[key], 10)]);
                result = result.slice(0, 15);

                let processed_json = new Array();

                for (let i = 0; i < result.length; i++)
                    processed_json.push(result[i]);
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'column'
                    },
                    title: {
                        text: "Strike Rate of Top 15 Batsmen"
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

                })
            })
    })

    document.getElementById('deathbowl').addEventListener('click', () => {

        fetch('http://localhost:3000/deathOverEcon')
            .then(res => res.json())
            .then(data => {

                let result = [];
                for (let key in data)
                    result.push([key, parseInt(data[key], 10)]);
                result = result.slice(0, 30);
                let processed_json = new Array();

                for (let i = 0; i < result.length; i++)
                    processed_json.push(result[i]);
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'column'
                    },
                    title: {
                        text: "Economy of Bowlers in Death Overs"
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

            })
    })

    document.getElementById('finalruns').addEventListener('click', () => {
        fetch('http://localhost:3000/scoreInFinal')
            .then(res => res.json())
            .then(data => {

                let result = [];
                for (let key in data)
                    result.push([key, parseInt(data[key], 10)])
                let processed_json = new Array();

                for (let i = 0; i < result.length; i++)
                    processed_json.push(result[i]);

                    new Highcharts.Chart({
                        chart: {
                            renderTo: 'container',
                            type: 'column'
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
        
            })
    })
};