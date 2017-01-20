import { Component } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _value: number;
  private _lastButtonPressed: string;


  constructor() {
    // set default value to 0
    this._value = 0.1;

  }


}
