// Graph CSV Data using chart.js

async function getData(){
    const response = await fetch('../data/ZonAnn.Ts+dSST.csv');
    const data = await response.text() // CSV in TEXT file

    const xYears = []; // x-axis 
    const yTemps = []; // y-axis
    const yNHtemps = []; // northern hemisphere
    const ySHtemps = []; // southern hemisphere

    const table = data.split('\n').slice(1); // split by line and remove the 0th row

    table.forEach(row => {  // operate on each row
        const columns = row.split(','); // split the row into columns
        const year = columns[0]; // get the year
        xYears.push(year); // push the year into the x-axis array

        const temp = parseFloat(columns[1]); // temp deviation
        yTemps.push(temp+14); // push the temp into the y-axis array

        const nhTemp = parseFloat(columns[2]);
        yNHtemps.push(temp+14); // push the temp into the y-axis array

        const shTemp = parseFloat(columns[3]); // southern hemisphere temp
        ySHtemps.push(temp+14); // push the temp into the y-axis array

        
    });

    return {xYears, yTemps, yNHtemps, ySHtemps}; // return the arrays
}

async function createChart(){
    const data = await getData(); // wait for the data to be fetched
    const ctx = document.getElementById('myChart');
    const degSymbol = String.fromCharCode(176); // degree symbol
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xYears,
            datasets: [{
                    label: `Combined Land-Surface Air and Sea-Surface Water Temperature in ${degSymbol}C`,
                    data: data.yTemps,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Combined Land-Surface Air and Sea-Surface Water Temperature in ${degSymbol}C`,
                    data: data.yNHtemps,
                    backgroundColor: 'rgba(65, 189, 56, 0.8)',
                    borderColor: 'rgba(65, 189, 56, 0.8)',
                    borderWidth: 1
                },
                {
                    label: `Combined Land-Surface Air and Sea-Surface Water Temperature in ${degSymbol}C`,
                    data: data.ySHtemps,
                    backgroundColor: 'rgba(39, 232, 245, 0.8)',
                    borderColor: 'rgba(39, 232, 245, 0.8)',
                    borderWidth: 1
                }
            ]
        },
        
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index) {
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 15
                        }
                    },
                },
                y: {
                    beginAtZero: false,        // start y-axis at 0
                    title: {
                        display: true,
                        text: 'Global Mean Temperatures (' + degSymbol + 'C)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yTemps.length / 10, // limit the number of ticks
                        font: {
                            size: 15
                        }
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: `Combined Land Surface Air and Sea Surface Water Temperature in ${degSymbol}C`,
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
        
    });
}

createChart();
getData();