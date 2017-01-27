import { Component } from '@angular/core';
import { States } from './enums/states.enum';
import { Operators } from './enums/operators.enum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Constants
  private MAX_NUMERIC_LENGTH: number = 10;

  // MainOutput is the string used to display the underlying numeric value (mainValue) on the calculator
  private _mainOutput = "";
  // MainValue is the underlying numeric value of the MainOutput
  private _mainValue = 0;

  // CurrentState will maintain the current state of the application from the enums provided
  private _currentState: States;
  // CurrentOperation will maintin the current selected operation
  private _currentOperation: Operators; 

  // Decimal in Progress determines if the decimal character was the last selected button
  private _decimalInProgress = false;
  // FirstValue/SecondValue are used to keep track of values in current Equation
  private _firstValue = 0;
  private _secondValue = 0;
  // CurrentEquation represents the FirstValue + Operator to display a temporary string above MainOutput
  private _currentEquation: string;
  private 

  // Default Constructor
  constructor() {
    // initalize the default value and current state
    this.updateValue(0.0);
    this._currentState = States.cleared;
    this._currentEquation = "";
  }


  // Event Handlers
  // **************

  // Operands
  concatOperand(char: string) {

    // use a switch to determine the current state
    switch (this._currentState) {
      case States.cleared: {
        // concat the value with current value whatever that is 
        this.updateValue(this.concat(this._mainValue, char));
        // set firstValue = to concatted number
        this._firstValue = this._mainValue;
        // update the current state
        this._currentState = States.holding_first_value;
        break;
      }

      case States.holding_first_value: {
        // update the first value with the char
        this.updateValue(this.concat(this._firstValue,char));
        this._firstValue = this._mainValue;
        break;
      }
      case States.holding_second_value: {
        this.updateValue(this.concat(this._secondValue,char));
        this._secondValue = this._mainValue;
        break;
      }
    }
  }
  // Operators
  setOperator(operator: string) {
    // transfer mainValue to firstValue to be safe
    this._firstValue = this._mainValue;
    // set main value back to 0
    this.updateValue(0);

    switch(operator){
      case "addition":{
        this._currentEquation = this._firstValue + " + ";
        this._currentOperation = Operators.addition;
        break;
      }
      case "subtraction":{
        this._currentEquation = this._firstValue + " - ";
        this._currentOperation = Operators.subtraction;
        break;
      }
      case "multiply":{
        this._currentEquation = this._firstValue + " x ";
        this._currentOperation = Operators.multiply;
        break;
      }
      case "divide":{
        this._currentEquation = this._firstValue + " / ";
        this._currentOperation = Operators.divide;
        break;
      }

    }
    this._currentState = States.holding_second_value;

  }
  setDecimal(){
    // try to get the index of a decimal point
    let decimalIndex = this._mainOutput.indexOf('.');
    
    // we already have a decimal, just return
    if(decimalIndex>=0)
      return;

    // if the value doesn't already contain a decimal
    if(this._mainValue%1==0 && !this._decimalInProgress)
    {
      // if the string is one char less than max, just return, we got no room
      if(this._mainOutput.length>=9)
        return;

      // set decimal in progress flag to true 
      this._decimalInProgress = true;
      this._mainOutput = this._mainOutput + ".";
    }
    else
      this._decimalInProgress = false;
  }


  // CLEAR Event Handler
  clear() {
    // set value back to 0.0 and reset current state
    this.updateValue(0);
    // reset first/second values
    this._firstValue = 0;
    this._secondValue = 0;
    // reset current state
    this._currentState = States.cleared;
    // set decimal to false
    this._decimalInProgress = false;
    // reset current equation
    this._currentEquation = "";
    this._currentOperation = Operators.none;
  }
  // EQUALS Event Handler
  equals() { 
    // if we have a set operator
    if(this._currentOperation!=Operators.none)
    {
      // perform math equation
      switch(this._currentOperation){
        case Operators.addition: {
          this.updateValue(this._firstValue+this._secondValue);
          break;
        }
        case Operators.subtraction: {
          this.updateValue(this._firstValue-this._secondValue);
          break;
        }
        case Operators.divide: {
          this.updateValue(this._firstValue/this._secondValue);
          break;
        }
        case Operators.multiply: {
          this.updateValue(this._firstValue*this._secondValue);
          break;
        }
      }
      // reset equation
      this._currentEquation="";
      this._firstValue = this._mainValue;
    }



  }
  // Inverse function to flip between positive/negative
  toggleInverse() {
    let tempValue = this._mainValue * -1;
    this.updateValue(tempValue);
  }

  // Private Functions
  // *****************

  // Concatanates multiple numbers
  private concat(base: number, next: string) {
    
    // compare the length of the current number's string to the max for viewing purposes
    if (base.toString().length < this.MAX_NUMERIC_LENGTH) {
      // if it's a decimal.. it's unique, yay
      if (this._decimalInProgress) {
        this._decimalInProgress = false;
        return Number(base + '.' + next);
      }
      // it's a number!
      else {
        // concat strings and return new number
        return Number(base.toString() + next);
      }

    }
    else
      return base;
  }

  // Updates the underlying value && output string
  private updateValue(newValue: number) {
      // update the value with the newValue parameter
      this._mainValue = newValue;
      // update the output string from the underlying numeric value
      this._mainOutput = this._mainValue.toString();
  }

}
