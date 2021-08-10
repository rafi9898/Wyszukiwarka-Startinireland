const data = {
    labels: [
        'Stage',
        'Service',
        'Founding',
        'Location',
        'Sector'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [100, 100, 100, 100, 100],
        backgroundColor: [
            '#563769',
            '#563769',
            '#563769',
            '#563769',
            '#34254A'
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
            }
        }
    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);