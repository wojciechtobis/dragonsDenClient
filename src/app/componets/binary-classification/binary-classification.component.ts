import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from '../../services/custom-http-client.service';
import { BinaryPrediction } from '../../models/binary-prediction.model';

@Component({
  selector: 'app-binary-classification',
  templateUrl: './binary-classification.component.html',
  styleUrls: ['./binary-classification.component.css']
})
export class BinaryClassificationComponent implements OnInit {

  private results: BinaryPrediction[]; 
  public data = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            borderColor: ''
        },
    ]
}

  constructor(private customHttpClientService: CustomHttpClientService) { }

  ngOnInit() {
  }

  public test(){
    var temp = this.customHttpClientService
      .getBinaryResultsForId(1)
      .subscribe(value => {
        this.results = value;
        this.data = {
          labels: value.map(c => c.test_id.toString()),
          datasets:[
            {
              label: 'Boosted',
              data: value.map(c => c.boostedProbability),
              borderColor: '#00cc00'
            },
            {
              label: 'Forest',
              data: value.map(c => c.forestProbability),
              borderColor: '#0000cc'
            },
            {
              label: 'Logistic',
              data: value.map(c => c.logisticProbability),
              borderColor: '#cc0000'
            },
            {
              label: 'Nnet',
              data: value.map(c => c.nnetProbability),
              borderColor: '#00cccc'
            }
          ]
        }
      })
  }

}
