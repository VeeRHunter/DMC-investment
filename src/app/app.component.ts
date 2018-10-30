import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ToastController } from 'ionic-angular';
// import { Subject } from 'rxjs/Subject';
// import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'InitialLoginPage';

  public pages: Array<{ title: string, component: any, image: string }>;
  public bottom_pages: Array<{ title: string, component: any, image: string }>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, toastCtrl: ToastController) {

    this.ionicInit();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // fcm.getToken();
      // console.log(fcm.getToken());

      // // Listen to incoming messages
      // fcm.listenToNotifications().pipe(
      //   tap(msg => {
      //     // show a toast
      //     const toast = toastCtrl.create({
      //       message: msg.body,
      //       duration: 3000
      //     });
      //     toast.present();
      //   })
      // ).subscribe();

    });
  }

  openPage(page) {
    if (page.title == "Log Out") {
      this.nav.setRoot('InitialLoginPage');
      localStorage.setItem("loged", "");
    } else {
      this.nav.push(page.component);
    }
  }

  ionicInit() {

    this.pages = [
      { title: 'Home', component: 'WelcomePage', image: "md-home" },
      { title: 'Live Feed', component: 'MainPage', image: "md-globe" },
      { title: 'Pending Transactions', component: 'PendingPage', image: "md-card" },
      { title: 'Transactions', component: 'TransactionPage', image: "md-card" },
      { title: 'Log Out', component: null, image: "md-log-out" },
      // { title: 'my_devices', component: MyDevicesPage, image: "devices" }
    ];

  }
}

