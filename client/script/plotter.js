
window.onload = () => {

    

    document.getElementById('lucky').addEventListener('click', () => luckyTeams())

    document.getElementById('strikerate').addEventListener('click', () => {
        fetch('http://localhost:3000/strikeRate')
            .then(res => res.json())
            .then(data => {
                data = Object.entries(data);
                function Comparator(a, b) {
                    if (a[1] > b[1]) return -1;
                    if (a[1] < b[1]) return 1;
                    return 0;
                  }
                 
                  data = data.sort(Comparator);
                  data = data.splice(0,15);
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'bar'
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
                        data: data
                    }]

                })
            })
    })

    document.getElementById('deathbowl').addEventListener('click', () => {

        fetch('http://localhost:3000/deathOverEcon')
            .then(res => res.json())
            .then(data => {
                data = Object.entries(data);
                function Comparator(a, b) {
                    if (a[1] < b[1]) return -1;
                    if (a[1] > b[1]) return 1;
                    return 0;
                  }
                  data = data.sort(Comparator);
                  data = data.splice(0, 15);
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'bar'
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
                        data: data
                    }]
                });

            })
    })

    document.getElementById('finalruns').addEventListener('click', () => {
        fetch('http://localhost:3000/scoreInFinal')
            .then(res => res.json())
            .then(data => {
               data = Object.entries(data);

                    new Highcharts.Chart({
                        chart: {
                            renderTo: 'container',
                            type: 'pie'
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
                            data: data
                        }]
                    });
        
            })
    })

    let luckyTeams = () =>{
        fetch('/luckyTeams')
            .then(res => res.json())
            .then(data => {
                data = Object.entries(data)
                
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'line'
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
                        data: data
                    }]
                });


            })
    }

    document.onload(luckyTeams())
};