import { Component } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _value: number;
  private _lastButtonPressed: string;

  // Default Constructor
  constructor() {
    // set default value to 0
    this._value = 0;
  }


  // Operands
  addOperand($event){

  }

  // Operators 
  

  // CLEAR Event Handler
  clear($event, role){
    console.log($event);    
  }

  // EQUALS Event Handler
  equals($event)
  {
    
  }

  

}
