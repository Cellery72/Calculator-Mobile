import { Component } from '@angular/core';
import { States } from './enums/states.enum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Constants
  private MAX_NUMERIC_LENGTH: number = 10;

  // MainOutput is the string used to display the underlying numeric value (mainValue) on the calculator
  private _mainOutput: string;
  // MainValue is the underlying numeric value of the MainOutput
  private _mainValue: number;

  // CurrentState will maintain the current state of the application from the enums provided
  private _currentState: States;

  // Decimal in Progress determines if the decimal character was the last selected button
  private _decimalInProgress = false;
  // FirstValue/SecondValue are used to keep track of values in current Equation
  private _firstValue: number;
  private _secondValue: number;
  // CurrentEquation represents the FirstValue + Operator to display a temporary string above MainOutput
  private _currentEquation: string;

  // Default Constructor
  constructor() {
    // initalize the default value and current state
    this.updateValue(0.0);
    this._currentState = States.cleared;
  }


  // Event Handlers
  // **************

  // Operands
  concatOperand(char: string) {
    // update the MainValue with the concatanated value + incoming string
    this.updateValue(this.concat(this._mainValue, char));
  }
  // Operators
  setOperator(operator: string) {
    // store the current value as the value to be used as FirstValue
    this._firstValue = this._mainValue;
  }
  // CLEAR Event Handler
  clear() {
    // set value back to 0.0 and reset current state
    this.updateValue(0);
    this._secondValue = undefined;
    this._currentState = States.cleared;
  }
  // EQUALS Event Handler
  equals() {

    // set current value
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
      if (next == ".") {
        // It doesn't already contain a decimal place
        if (!this._decimalInProgress) {
          // set decimal flag
          this._decimalInProgress = true;
          return base;
        }
        // already has a decimal
        else {
          return base;
        }
      }
      // it's a number!
      else {

        // concat strings and return new number
        return Number(base.toString() + next);
      }

    }
  }

  // Updates the underlying value && output string
  private updateValue(newValue: number) {
    // update the value with the newValue parameter
    this._mainValue = newValue;

    // update the output string from the underlying numeric value
    this._mainOutput = this._mainValue.toString();
  }

}
