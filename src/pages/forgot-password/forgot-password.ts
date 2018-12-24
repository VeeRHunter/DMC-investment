import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  public emailCtrl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  public passCtrl = new FormControl('', [
    Validators.required
  ]);

  public sendRequest = true;

  public userData = { "email": "", "password": "", "apiState": "forgotPass", "confirm": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    localStorage.setItem("confirmType", "back");
  }

  goback() {
    if (localStorage.getItem("confirmType") == "back") {
      this.navCtrl.pop();
    }
    if (localStorage.getItem("confirmType") == "confirm") {
      localStorage.setItem("confirmType", "back");
      this.sendRequest = true;
    }
  }

  signUpUser(forgotInfor) {
    if (this.userData.email != "" && this.userData.password != "") {
      localStorage.setItem("confirmType", "confirm");
      this.sendForgotRequest();
    }
  }

  sendForgotRequest() {
    this.userData.apiState = "forgotPass";
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      if (Object(result).status == "success") {
        this.sendRequest = false;
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
    });
  }

  resendCode() {
    this.sendForgotRequest();
  }

  sendConfirmCode() {
    this.userData.apiState = "sendConfirm";
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      if (Object(result).status == "success") {
        this.navCtrl.setRoot('InitialLoginPage');
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
    });
  }

}
