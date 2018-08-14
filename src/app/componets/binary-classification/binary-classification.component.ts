import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from '../../services/custom-http-client.service';
import { BinaryPrediction } from '../../models/binary-prediction.model';
import { ChartData } from '../../models/chart-data.model';
import { ChartOptions } from '../../models/chart-options.model';

@Component({
  selector: 'app-binary-classification',
  templateUrl: './binary-classification.component.html',
  styleUrls: ['./binary-classification.component.css']
})
export class BinaryClassificationComponent implements OnInit {

  private results: BinaryPrediction[];
  private interval;

  public currentCycle: number;
  public data: ChartData;
  public chartOptions: ChartOptions;
  public boostedProbability: number;
  public forestProbability: number;
  public logisticProbability: number;
  public nnetProbability: number;
  public currentResults: BinaryPrediction[];
  public sliderRange: number;

  constructor(private customHttpClientService: CustomHttpClientService) { }

  ngOnInit() {
    this.currentCycle = 40;
    this.chartOptions = {
      scales: {
        yAxes: [{
            ticks: {
                max: 1,
                min: 0
            }
        }]
      },
      animation: {
        duration: 0,
      },
      hover: {
          animationDuration: 0,
      },
      responsiveAnimationDuration: 0,
    }
  }

  public getResults(id: number){

    this.customHttpClientService
      .getBinaryResultsForId(id)
      .subscribe(value => {
        this.results = value;
        this.sliderRange = value.length-1;
        this.currentCycle = 50;
        this.updateState(this.currentCycle);        
      });
  }

  public nextCycle(){
    this.updateState(this.currentCycle + 1);
  }

  public start(){
    if(!this.interval){
      this.interval = setInterval(() => this.nextCycle(),1000);
    }
  }

  public pause(){
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  public stop(){
    this.pause();
    this.updateState(this.results.length);
  }

  public prevCycle(){
    this.updateState(this.currentCycle - 1);
  }

  public sliderChange(){
    this.updateState(this.currentCycle);
  }

  private convertToChartData(results: BinaryPrediction[]): ChartData{
    return {
      labels: results.map(c => c.cycle.toString()),
      datasets:[
        {
          label: 'Boosted',
          data: results.map(c => c.boostedProbability),
          borderColor: '#00cc00'
        },
        {
          label: 'Forest',
          data: results.map(c => c.forestProbability),
          borderColor: '#0000cc'
        },
        {
          label: 'Logistic',
          data: results.map(c => c.logisticProbability),
          borderColor: '#cc0000'
        },
        {
          label: 'Nnet',
          data: results.map(c => c.nnetProbability),
          borderColor: '#00cccc'
        }
      ]
    }
  }

  private setProbabilities(){
    this.boostedProbability = this.results[this.currentCycle-1].boostedProbability;
    this.forestProbability = this.results[this.currentCycle-1].forestProbability;
    this.logisticProbability = this.results[this.currentCycle-1].logisticProbability;
    this.nnetProbability = this.results[this.currentCycle-1].nnetProbability;
  }

  private updateState(currentCycle: number){
    if(currentCycle > this.results.length || currentCycle <= 0){
      this.pause();
      return;
    }
    this.currentCycle = currentCycle;
    this.currentResults = this.results.filter(c => c.cycle <= this.currentCycle);
    this.data = this.convertToChartData(this.currentResults);
    this.setProbabilities();
  }
}
