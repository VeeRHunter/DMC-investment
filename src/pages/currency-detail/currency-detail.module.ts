import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyDetailPage } from './currency-detail';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CurrencyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyDetailPage),ChartsModule
  ],
})
export class CurrencyDetailPageModule {}
