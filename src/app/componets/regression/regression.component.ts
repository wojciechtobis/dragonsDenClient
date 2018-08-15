import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '../../models/chart-options.model';
import { ChartData } from '../../models/chart-data.model';
import { CustomHttpClientService } from '../../services/custom-http-client.service';
import { RegressionPrediction } from '../../models/regression-prediction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css']
})
export class RegressionComponent implements OnInit {

  private results: RegressionPrediction[];
  private interval;

  public currentTest: number;
  public currentCycle: number;
  public data: ChartData;
  public chartOptions: ChartOptions;
  public boostedPrediction: string;
  public forestPrediction: string;
  public poissonPrediction: string;
  public nnetPrediction: string;
  public currentResults: RegressionPrediction[];
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
                max: 260,
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

    this.getResults(1);
  }

  public getResults(id: number){

    this.currentTest = id;

    this.customHttpClientService
      .getRegressionResultsForId(id)
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

  public navigateToBinary(){
    this.router.navigate(['binary-classification']);
  }

  private convertToChartData(results: RegressionPrediction[]): ChartData{
    return {
      labels: results.map(c => c.cycle.toString()),
      datasets:[
        {
          label: 'Boosted',
          data: results.map(c => c.boostedPrediction),
          borderColor: '#00cc00'
        },
        {
          label: 'Forest',
          data: results.map(c => c.forestPrediction),
          borderColor: '#0000cc'
        },
        {
          label: 'Poisson',
          data: results.map(c => c.poissonPrediction),
          borderColor: '#cc0000'
        },
        {
          label: 'Nnet',
          data: results.map(c => c.nnetPrediction),
          borderColor: '#00cccc'
        }
      ]
    }
  }

  private setProbabilities(){
    this.boostedPrediction = this.convertProbability(this.results[this.currentCycle-1].boostedPrediction);
    this.forestPrediction = this.convertProbability(this.results[this.currentCycle-1].forestPrediction);
    this.poissonPrediction = this.convertProbability(this.results[this.currentCycle-1].poissonPrediction);
    this.nnetPrediction = this.convertProbability(this.results[this.currentCycle-1].nnetPrediction);
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

    return probability.toFixed(2);
  }
}
