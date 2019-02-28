import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  baseUrl:string = "https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice";
  
  constructor(private httpClient : HttpClient) { }
  
  get_tmax(para){
	  return this.httpClient.get(this.baseUrl + para);
  }
}
