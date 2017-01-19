import { StatusBar } from 'ionic-native/dist/esm';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

// Custom Page
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class Calculator {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
    });
  }
}
