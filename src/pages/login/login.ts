import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Content, Platform, MenuController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { FingerprintAIO, FingerprintOptions } from '../../../node_modules/@ionic-native/fingerprint-aio';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Content) content: Content;

  public pin1 = "";
  public pin2 = "";
  public pin3 = "";
  public pin4 = "";

  fingerprintOptions: FingerprintOptions;

  public userData = { "email": "", "pinCode": "", "apiState": "pinlogin", "lastLoginTime": "" };
  public availAccess = false;
  public lastLoginTime: any;

  public weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public menuCtrl: MenuController
    , public loadingCtrl: LoadingController, public apiserver: ServerProvider, public platform: Platform, public fingerAuth: FingerprintAIO) {
  }

  ionViewDidLoad() {
    this.fingerprintOptions = {
      clientId: 'fingerprint',
      clientSecret: 'password',
      disableBackup: true
    };
    console.log('ionViewDidLoad LoginPage');
    this.userData.email = localStorage.getItem("useremail");
    this.menuCtrl.swipeEnable(false);
    
    // this.getLastLoginTime();
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  getLastLoginTime() {
    console.log(new Date().toString());
    let currentDateTime = new Date().toString();
    let currentTime = "";
    let currentDate = "";
    let currentTimeZoon = "";
    // Fri Aug 10 2018 09:59:10 GMT+0700 (Novosibirsk Standard Time)
    if (parseInt(currentDateTime.split(" ")[4].split(":")[0]) > 12) {
      currentTime = (parseInt(currentDateTime.split(" ")[4].split(":")[0]) - 12) + ":" + currentDateTime.split(" ")[4].split(":")[1] + " pm On ";
    } else {
      currentTime = currentDateTime.split(" ")[4].split(":")[0] + ":" + currentDateTime.split(" ")[4].split(":")[1] + " am On ";
    }
    for (let list of this.weekName) {
      if (list.includes(currentDateTime.split(" ")[0])) {
        currentDate = list + " " + currentDateTime.split(" ")[2];
      }
    }
    for (let list of this.monthNames) {
      if (list.includes(currentDateTime.split(" ")[1])) {
        currentDate = currentDate + " " + list + " " + currentDateTime.split(" ")[3];
      }
    }
    currentTimeZoon = " (" + currentDateTime.split(" ")[5] + ")";
    this.lastLoginTime = currentTime + currentDate + currentTimeZoon;
    console.log(this.lastLoginTime);
    this.userData.lastLoginTime = this.lastLoginTime;
  }

  changeInput1(input2) {
    if (this.pin1.length == 1) {
      localStorage.setItem("input1", this.pin1);
      input2.setFocus();
    }
    else if (this.pin1.length > 1) {
      this.pin1 = this.pin1.slice(0, -1);
    }
    this.checkAvailAccess();
  }

  changeInput2(input1, input3) {
    if (this.pin2.length == 1) {
      localStorage.setItem("input2", this.pin2);
      input3.setFocus();
    } else if (this.pin2 == "") {
      if (localStorage.getItem("input2").length == 1) {
        localStorage.setItem("input2", "");
      } else {
        input1.setFocus();
      }
    }
    else {
      this.pin2 = this.pin2.slice(0, -1);
    }
    this.checkAvailAccess();
  }

  changeInput3(input2, input4) {
    if (this.pin3.length == 1) {
      localStorage.setItem("input3", this.pin3);
      input4.setFocus();
    } else if (this.pin3 == "") {
      if (localStorage.getItem("input3").length == 1) {
        localStorage.setItem("input3", "");
      } else {
        input2.setFocus();
      }
    }
    else {
      this.pin3 = this.pin3.slice(0, -1);
    }
    this.checkAvailAccess();
  }

  changeInput4(input3) {
    if (this.pin4 == "") {
      if (localStorage.getItem("input4").length == 1) {
        localStorage.setItem("input4", "");
      } else {
        input3.setFocus();
      }
    }
    else if (this.pin4.length == 1) {
      localStorage.setItem("input4", this.pin4);
    }
    else {
      this.pin4 = this.pin4.slice(0, -1);
    }
    this.checkAvailAccess();
  }

  checkAvailAccess() {
    if (this.pin1 != "" && this.pin2 != "" && this.pin3 != "" && this.pin4 != "") {
      this.availAccess = true;
    } else {
      this.availAccess = false;
    }
  }

  submitAccess() {
    console.log("login");
    if (this.pin1 != "" && this.pin2 != "" && this.pin3 != "" && this.pin4 != "") {
      this.getLastLoginTime();
      this.userData.email = localStorage.getItem("useremail");
      this.userData.pinCode = this.pin1 + this.pin2 + this.pin3 + this.pin4;
      this.userData.apiState = "pinlogin";

      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();

      this.apiserver.postData(this.userData).then(result => {
        console.log(result);
        loading.dismiss();
        if (Object(result).status == "success") {
          localStorage.setItem("lastLoginName", Object(result).username);
          localStorage.setItem("lastLoginTime", Object(result).lastLoginTime);
          localStorage.setItem("userVerified", Object(result).userVerified.toString());
          localStorage.setItem("afterLogin", "login");
          this.navCtrl.setRoot('WelcomePage');
        } else {
          let toast = this.toastCtrl.create({
            message: Object(result).detail,
            duration: 2000
          });
          toast.present();
        }
      }, error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        });
        toast.present();
        console.error(error);
      })

      // this.navCtrl.push(WelcomePage);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please input pin code',
        duration: 3000
      });

      toast.present();
    }
  }

  async fingerLogin() {

    this.userData.apiState = "fingerlogin";

    try {
      await this.platform.ready();
      console.log("custom log");
      const available = await this.fingerAuth.isAvailable();
      console.log(available);
      if (available != null) {
        const result = await this.fingerAuth.show(this.fingerprintOptions);
        if (result.withFingerprint != null && result.withFingerprint != "") {
          this.getLastLoginTime();
          let loading = this.loadingCtrl.create({
            content: "Please Wait..."
          });
          loading.present();
          this.apiserver.postData(this.userData).then(result => {
            loading.dismiss();
            if (Object(result).status == "success") {
              localStorage.setItem("lastLoginName", Object(result).username);
              localStorage.setItem("lastLoginTime", Object(result).lastLoginTime);
              localStorage.setItem("userVerified", Object(result).userVerified.toString());
              localStorage.setItem("afterLogin", "login");
              this.navCtrl.setRoot('WelcomePage');
            } else {
              let toast = this.toastCtrl.create({
                message: Object(result).detail,
                duration: 2000
              });
              toast.present();
            }
          }, error => {
            loading.dismiss();
            let toast = this.toastCtrl.create({
              message: "No Network",
              duration: 2000
            });
            toast.present();
          })
        }
        console.log(result);
      }
    } catch (error) {
      let toast = this.toastCtrl.create({
        message: "You didn't set fingerprint password on your phone. Please set and try again",
        duration: 2000
      });
      toast.present();
      console.log("error log");
      console.error(error);
    }

  }

  logOff() {
    localStorage.setItem("loged", "");
    this.navCtrl.setRoot('InitialLoginPage');
  }

}
