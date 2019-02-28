import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from './data.service';
import * as CanvasJS from './canvasjs.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {

  tmax = [];
  selectedRegion = "UK";
  selectedMetric = "Tmax";
  para = '/Tmax-UK.json';
  start = '2001-01-01';
  end = '2002-01-01';
  dataPoints = [];
  
  ngOnInit(){
	
	this.changeGraph();
  }
  
  constructor (private dataService: DataService){
	this.getData();
  }
  
  onSelectRegion(region){
    this.selectedRegion = region;
	this.para = '/'+this.selectedMetric+'-'+this.selectedRegion+'.json';
	this.getData();
	this.changeGraph();
	console.log(this.para);
  }
  
  onSelectMetric(metric){
    this.selectedMetric = metric;
	this.para = '/'+this.selectedMetric+'-'+this.selectedRegion+'.json';
	this.getData();
	this.changeGraph();
	console.log(this.para);
  }
  
  onChangeStart(start){
	  this.start = start;
	  this.changeGraph();
	  console.log(start);
  }
  
  onChangeEnd(end){
	  this.end = end;
	  this.changeGraph();
	  console.log(end);
  }
  
  getData(){
	  this.dataService.get_tmax(this.para).subscribe((res : any[]) =>{
		this.tmax = res;
	})
  }
  
  changeGraph(){
	  let tmax = this.tmax;
	  var s = this.start.split('-');
	  var e = this.end.split('-');
	  this.dataPoints = [];
	  
	  for(let entry of tmax){
		  if(entry.year >= s[0] && entry.year <= e[0]){
			  let date = entry.year+'-'+entry.month;
			  this.dataPoints.push({y:entry.value , label:date});
		  }
	  }
	  console.log(this.dataPoints);
	  
	  let chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Performance Demo - 10000 DataPoints"
		},
		subtitles:[{
			text: "Try Zooming and Panning"
		}],
		data: [
		{
			type: "spline",                
			dataPoints: this.dataPoints
		}]
	});
	chart.render();
  }
  
  
  title = 'Weather App';
}
