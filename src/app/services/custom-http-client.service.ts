import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';
import { BinaryPrediction } from '../models/binary-prediction.model';
import { Response, ResponseContentType } from '@angular/http';

@Injectable()
export class CustomHttpClientService {

  apiUrl = 'http://localhost:56661/api/values';

  constructor(private http: HttpClient) { }

  public getBinaryResultsForId(id: number): Observable<BinaryPrediction[]>{
    const url = this.apiUrl + '/' + id;
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
}
