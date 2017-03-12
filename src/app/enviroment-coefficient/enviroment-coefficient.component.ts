import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviroment-coefficient',
  templateUrl: './enviroment-coefficient.component.html',
  styleUrls: ['./enviroment-coefficient.component.css']
})
export class EnviromentCoefficientComponent implements OnInit {
  EF : number = 0;
  // ES : number = 0;
  // P : number = 0;
  ES: string = "Chua lam xong";
  P : string = "Chua lam xong";
  rankValue1 : number = 0; 
  rankValue2 : number = 0; 
  rankValue3 : number = 0; 
  rankValue4 : number = 0; 
  rankValue5 : number = 0; 
  rankValue6 : number = 0; 
  rankValue7 : number = 0; 
  rankValue8 : number = 0; 

  constructor() { }

  ngOnInit() {
  }
  ngDoCheck(){
    let sum = this.rankValue1*1 +
     this.rankValue2*1 +
     this.rankValue3*1 +
     this.rankValue4*1 +
     this.rankValue5*1 +
     this.rankValue6*1 +
     this.rankValue7*1 +
     this.rankValue8*1 ;
     
    this.EF = 1.4 + (-0.03 * sum );
    // this.ES = 
  }

}
