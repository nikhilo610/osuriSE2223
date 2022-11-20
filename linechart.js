// Graph CSV data using chart.js

async function getData(){
    const response = await fetch('researchdata.csv');
    const data = await response.text(); // CSV in TEXT format
    //console.log(data);
    const xTrials = []; // x-axis labels 
    const yHundred = []; //y-axis value
    const yHundredFifty = []; //y-axis value

    const table = data.split('\n').slice(1);       // split by line and remove the 0th row
    //console.log(table);



    table.forEach(row => {              // operate on each row
        const columns = row.split(','); // split each row into col.
        const trial = columns[0];        // assign year value
        xTrials.push(trial);              // Push year value into array xYears
        const hundred = parseFloat(columns[1]);      // NH temp
        yHundred.push(hundred);              // push temp value into array yTemps
        const hundredFifty = parseFloat(columns[2]);      // SH temp  
        yHundredFifty.push(hundredFifty);              // push temp value into array yTemps
    });
    return {xTrials, yHundred, yHundredFifty}; 
}

async function createChart(){
    const data = await getData();                    // createChart() will wait until getData() processes
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xTrials,             // x-axis labels
            datasets: [
                {
                label: '100 Pound Force Readings',
                data: data.yHundred,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3
            },
            {
                label: '150 Pound Force Readings',
                data: data.yHundredFifty,
                backgroundColor: 'rgba(77, 47, 176, 0.8)',
                borderColor: 'rgba(77, 47, 176, 0.8)',
                borderWidth: 3
            },
        ]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Trial #',
                        font: {
                            size: 20
                        },
                    }, 
                    max: 4,
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Force in Newtons',
                        font: {
                            size: 20
                        },
                    }
                },
            
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: '100 and 150 Pound Force Readings to Tip Chair Over Without Apparatus in Newtons',
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
