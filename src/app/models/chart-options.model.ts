export interface ChartOptions {
    scales: {
        yAxes: [{
            ticks: {
                max: number,
                min: number
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