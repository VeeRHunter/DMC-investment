import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public logedTime = "05.53";
  public logedDate = "Monday 16 july 2018";
  public logedTimezone = "GMT +10.00";

  public lastLoginUserName = "";
  public lastLoginTime = "";
  public userVerified = false;

  public userData = { "email": "", "apiState": "gerUserDetail" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    if (localStorage.getItem("afterLogin") == "login") {
      this.lastLoginUserName = localStorage.getItem("lastLoginName");
      this.lastLoginTime = localStorage.getItem("lastLoginTime");
      localStorage.setItem("afterLogin", "");
      if (localStorage.getItem("userVerified") == "0") {
        this.userVerified = false;
      } else if (localStorage.getItem("userVerified") == "1") {
        this.userVerified = true;
      }
    } else {
      this.getData();
    }
  }

  getData() {
    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      console.log(result);
      if (Object(result).status == "success") {
        this.lastLoginTime = Object(result).lastLoginTime;
        this.lastLoginUserName = Object(result).lastLoginName;
        this.userVerified = Object(result).userVerified;
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

  logOff() {
    localStorage.setItem("loged", "");
    this.navCtrl.setRoot('InitialLoginPage');
  }
  gotoRealEstate() {
    this.navCtrl.push('MainPage');
  }
  gotoAccount() {
    this.navCtrl.push('AccountPage');
  }
  gotoSMSF() {
    this.navCtrl.push('SmsfPage');
  }
  gotoEscrow() {
    this.navCtrl.push('EascrowPage');
  }

  verifyId() {
    localStorage.setItem("verifyType", "idVerify");
    this.navCtrl.push('IdVerifyPage');
  }

}
