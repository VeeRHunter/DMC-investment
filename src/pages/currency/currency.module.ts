import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyPage } from './currency';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CurrencyPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyPage),
    ChartsModule,
  ],
})
export class CurrencyPageModule { }
