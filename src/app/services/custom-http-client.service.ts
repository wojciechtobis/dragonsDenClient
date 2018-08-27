import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';
import { BinaryPrediction } from '../models/binary-prediction.model';
import { Response, ResponseContentType } from '@angular/http';
import { RegressionPrediction } from '../models/regression-prediction.model';

@Injectable()
export class CustomHttpClientService {

  apiUrl = 'http://anddd.hostingasp.pl/api/';

  constructor(private http: HttpClient) { }

  public getBinaryResultsForId(id: number): Observable<BinaryPrediction[]>{
    const url = this.apiUrl + 'values/' + id;
    return this.http
      .get(url)
      .pipe(
        map(response =>{
          return this.processBinaryPrediction(response);
        })
      );
  }

  private processBinaryPrediction(response): BinaryPrediction[]{
      let result: BinaryPrediction[] = null;
      if (response && response.constructor === Array) {
        result = [];
        for (const item of response) {
          result.push(new BinaryPrediction(item));
        }
      }
      return result;
  }

  public getRegressionResultsForId(id: number): Observable<RegressionPrediction[]>{
    const url = this.apiUrl + 'regression/' + id;
    return this.http
      .get(url)
      .pipe(
        map(response =>{
          return this.processRegressionPrediction(response);
        })
      );
  }

  private processRegressionPrediction(response): RegressionPrediction[]{
    let result: RegressionPrediction[] = null;
    if (response && response.constructor === Array) {
      result = [];
      for (const item of response) {
        result.push(new RegressionPrediction(item));
      }
    }
    return result;
}
}
