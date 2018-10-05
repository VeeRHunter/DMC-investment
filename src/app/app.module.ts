import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Camera } from '@ionic-native/camera';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { HttpModule } from '@angular/http';

import { FcmProvider } from '../providers/fcm/fcm';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ServerProvider } from '../providers/server/server';

import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const firebase = {
  apiKey: "AIzaSyABnklED1Zls6MD5dJ2I7L8rdhRVLksjzM",
  authDomain: "digitalminingcorpau-dc32a.firebaseapp.com",
  databaseURL: "https://digitalminingcorpau-dc32a.firebaseio.com",
  projectId: "digitalminingcorpau-dc32a",
  storageBucket: "digitalminingcorpau-dc32a.appspot.com",
  messagingSenderId: "313767785609"
};

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
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FingerprintAIO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServerProvider,
    InAppBrowser,
    Firebase,
    FcmProvider,
  ]
})
export class AppModule { }
