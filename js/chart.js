var myChart;

const renderChartGlobal = (color1, color2, color3, color4, color5) => {

    if(myChart) {
        myChart.destroy();
    }
    
    const data = {
        labels: [
            'Stage',
            'Type',
            'Founding',
            'Location',
            'Sector'
        ],
        datasets: [{
            label: 'Chart',
            data: [100, 100, 100, 100, 100],
            backgroundColor: [
                `${color2 ? color2 : '#563769'}`,
                `${color3 ? color3 : '#563769'}`,
                `${color4 ? color4 : '#563769'}`,
                `${color5 ? color5 : '#563769'}`,
                `${color1 ? color1 : '#563769'}`
            ],
            hoverOffset: 4
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            
            plugins: {
                legend: {
                    display: false
                },
                tooltip: false
            
            },
        }
    };
    
     myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

renderChartGlobal();