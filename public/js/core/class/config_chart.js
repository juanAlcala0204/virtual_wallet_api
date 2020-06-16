class ConfigurationChart {

    constructor(data, type) {
        this.data = data;
        this.type = type;
        this.objChart = this.createConfig();
    }

    createConfig() {
        const config = {
            type: this.type,
            data: {
                labels: this.data.labels,
                datasets: this.createDataSet()
            },
            options: this.createOption()
        }

        return config;

    }
    createDataSet() {
        return [{
            label: "Numero Incidentes",
            lineTension: 0.3,
            backgroundColor: "rgba(255,255,255,1)",
            borderColor: "rgba(138,221,45,0.8)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(138,221,45,0.8)",
            pointBorderColor: "rgba(138,221,45,0.8)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(138,221,45,0.8)",
            pointHoverBorderColor: "rgba(138,221,45,0.8)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: this.data.dataGet,
        }]
    }

    createOption() {
        return {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                }
            }
        }
    }
    
    updateDataSet(){
        //Creación de metodo para actualización de data 
    }
    
    updateOption( type, colors){
        this.objChart.type = type;
        // cambiar colo falta
        //this.objChart.data.datasets.
    }
    get objectChart() {
        return this.objChart
    }
}



export default ConfigurationChart;