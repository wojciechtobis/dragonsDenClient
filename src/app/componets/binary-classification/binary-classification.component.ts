import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from '../../services/custom-http-client.service';
import { BinaryPrediction } from '../../models/binary-prediction.model';
import { ChartData } from '../../models/chart-data.model';
import { ChartOptions } from '../../models/chart-options.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-binary-classification',
  templateUrl: './binary-classification.component.html',
  styleUrls: ['./binary-classification.component.css']
})
export class BinaryClassificationComponent implements OnInit {

  private results: BinaryPrediction[];
  private interval;

  public currentTest: number;
  public currentCycle: number;
  public data: ChartData;
  public chartOptions: ChartOptions;
  public boostedProbability: string;
  public forestProbability: string;
  public logisticProbability: string;
  public nnetProbability: string;
  public currentResults: BinaryPrediction[];
  public sliderRange: number;

  constructor(
    private customHttpClientService: CustomHttpClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentCycle = 40;
    this.chartOptions = {
      scales: {
        yAxes: [{
            ticks: {
                max: 1,
                min: 0
            },
            scaleLabel: {
              display: true,
              labelString: "Probability of malfunction"
            }
        }],
        xAxes: [{
          scaleLabel:{
              display: true,
              labelString: "Cycle"
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

    this.getResults(1);
  }

  public getResults(id: number){

    this.currentTest = id;

    this.customHttpClientService
      .getBinaryResultsForId(id)
      .subscribe(value => {
        this.results = value;
        this.sliderRange = value.length;
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

  public navigateToRegression(){
    this.router.navigate(['regression']);
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
    this.boostedProbability = this.convertProbability(this.results[this.currentCycle-1].boostedProbability);
    this.forestProbability = this.convertProbability(this.results[this.currentCycle-1].forestProbability);
    this.logisticProbability = this.convertProbability(this.results[this.currentCycle-1].logisticProbability);
    this.nnetProbability = this.convertProbability(this.results[this.currentCycle-1].nnetProbability);
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

  private convertProbability(probability: number): string {

    return (100*probability).toFixed(2) + '%'
  }
}
