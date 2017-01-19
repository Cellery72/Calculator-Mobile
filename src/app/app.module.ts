import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Calculator } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    Calculator,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(Calculator)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Calculator,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
