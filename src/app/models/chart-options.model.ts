export interface ChartOptions {
    scales: {
        yAxes: [{
            ticks: {
                max: number,
                min: number
            },
            scaleLabel:{
                display: boolean,
                labelString: string
            }
        }],
        xAxes: [{
            scaleLabel:{
                display: boolean,
                labelString: string
            }
        }]
    },
    animation: {
        duration: number,
    },
    hover: {
        animationDuration: number,
    },
    responsiveAnimationDuration: number,
}