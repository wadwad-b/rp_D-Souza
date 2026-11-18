async function getData() {
    const response = await fetch('../data.csv');
    const data = await response.text();
    console.log(data);

    const xGroups = [];  // x-axis labels = group (control, orbital, linear)
    const yMeans = [];  // y-axis labels = mean of 12 trials

    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');         // split each row into columns using commas
        const group = columns[0];               // assign group value
        xGroups.push(group);                    // push group value into array xGroups

        const mean = parseFloat(columns[3]);   // convert means to floats
        yMeans.push(mean);                     // push mean values to yMeans

        console.log(group, mean);               // Log data

    });
    return {xGroups, yMeans}; // Use {} to return multiple values as an object

}

async function createChart() {
    const data = await getData();
    const chart = document.getElementById('chart');     // Get the html element that will hold the chart
        
    const myChart = new Chart(chart, {  // Construct the chart    
        type: 'bar',
        data: {                         // Define data
            labels: data.xGroups,       // x-axis labels
            datasets: [                
                {
                    label:    `Mean Sedimentation Time in seconds`,     // Dataset label for legend
                    data:     data.yMeans,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  ['rgba(62, 113, 178, 0.4)','rgba(248, 137, 42, 0.4)','rgba(34, 160, 52, 0.4)'],    // Color for data marker
                    borderColor:      ['rgb(62, 113, 178)','rgb(248, 137, 42)','rgb(34, 160, 52)'],      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Oscillation Type (Group)',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Sedimentation Time (seconds)`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {                   
                        maxTicksLimit: data.yMeans.length/10,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Mean Sedimentation Time of Sand Under Different Types of Oscillation',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }       
    });
    

}

createChart();