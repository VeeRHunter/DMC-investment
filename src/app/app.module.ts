import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { HttpModule } from '@angular/http';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ServerProvider } from '../providers/server/server';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServerProvider,
    InAppBrowser,
  ]
})
export class AppModule { }
