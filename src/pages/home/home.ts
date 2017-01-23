import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Constants
  private MAX_NUMERIC_LENGTH: number = 10;

  // MainOutput is the string used to display the MainValue on the calculator
  private _mainOutput: string;
  // MainValue is the underlying numeric value of the MainOutput
  private _mainValue: number;
  // LastButtonPressed represents the last button pressed to hold operator/decimal when applicable
  private _lastButtonPressed: string;
  private _containsDecimal = false;
  // FirstValue/SecondValue are used to keep track of values in current Equation
  private _firstValue: number;
  private _secondValue: number;
  // CurrentEquation represents the FirstValue + Operator to display a temporary string above MainOutput
  private _currentEquation: string;

  // Default Constructor
  constructor() {
    this.updateValue(0.0);
  }


  // Event Handlers
  // **************

  // Operands
  concatOperand(char: string) {
    // set current operand as last selected button
    this._lastButtonPressed = char;
    // update the MainValue with the concatanated value + incoming string
    this.updateValue(this.concat(this._mainValue, char));
  }
  // Operators
  setOperator(operator: string) {
    // save the operator as the last button pressed
    this._lastButtonPressed = operator;
    // store the current value as the value to be used as FirstValue
    this._firstValue = this._mainValue;
  }
  // CLEAR Event Handler
  clear() {
    // reset last selected button
    this._lastButtonPressed = undefined;
    // set value back to 0.0
    this.updateValue(0);
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
        if (!this._containsDecimal) {
          // set decimal flag
          this._containsDecimal = true;
          return base;
        }
        // already has a decimal
        else {
          return base;
        }
      }
      // it's a number!
      else {

        if (this._lastButtonPressed == ".") {
          return Number(base.toString() + "." + next);
        }
        else {
          // concat strings and return new number
          return Number(base.toString() + next);
        }
      }

    }
  }

  // Updates the underlying value && output string
  private updateValue(newValue: number) {
    // update the value with the newValue parameter
    this._mainValue = newValue;

    if (this._lastButtonPressed == ".") {
      // update the output string from the underlying numeric value
      this._mainOutput = this._mainValue.toString() + ".";
    }
    else {
      // update the output string from the underlying numeric value
      this._mainOutput = this._mainValue.toString();
    }
  }

}
