import { ChartDataSet } from "./chart-dataset.model";

export interface ChartData {
    labels: string[],
    datasets: ChartDataSet[]
}