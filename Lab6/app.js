const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

function generatedata() {
    const minTemp = [];
    const maxTemp = [];
    const rain = [];

    for (let i = 0; i < 7; i++) {
        const min = Math.floor(Math.random() * (19 - 14 + 1)) + 14;
        const max = Math.floor(Math.random() * (31 - 23 + 1)) + 23;
        const isRaining = Math.random() > 0.6;
        const rainAmount = isRaining ? parseFloat((Math.random() * 15).toFixed(1)) : 0;

        minTemp.push(min);
        maxTemp.push(max);
        rain.push(rainAmount);
    }

    return { minTemp, maxTemp, rain };
}

let data = generatedata();
const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: 'Макс. температура (°C)',
                data: data.maxTemp,
                borderColor: '#e53e3e',
                backgroundColor: '#e53e3e',
                yAxisID: 'yTemp',
                tension: 0.3
            },
            {
                type: 'line',
                label: 'Мін. температура (°C)',
                data: data.minTemp,
                borderColor: '#3182ce',
                backgroundColor: '#3182ce',
                yAxisID: 'yTemp',
                tension: 0.3
            },
            {
                type: 'bar',
                label: 'Опади (мм)',
                data: data.rain,
                backgroundColor: '#4299e1',
                borderColor: '#4299e1',
                borderWidth: 1,
                yAxisID: 'yRain'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            yTemp: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Температура (°C)'
                },
                min: 10,
                max: 35
            },
            yRain: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Опади (мм)'
                },
                min: 0,
                max: 20,
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }
});
const updateButton = document.getElementById('updateBtn');

updateButton.addEventListener('click', function() {
    const newData = generatedata();
    weatherChart.data.datasets[0].data = newData.maxTemp;
    weatherChart.data.datasets[1].data = newData.minTemp;
    weatherChart.data.datasets[2].data = newData.rain;
    weatherChart.update();
});