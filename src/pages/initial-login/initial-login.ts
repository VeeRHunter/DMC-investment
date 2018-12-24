import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the InitialLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initial-login',
  templateUrl: 'initial-login.html',
})
export class InitialLoginPage {

  public emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  public userData = { "email": "", "password": "", "apiState": "initialLogin" };

  public countryList = ["Australia", "United State"];
  public uniqueList = ["unique1", "unique2"];

  public clickSignUp = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public apiserver: ServerProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialLoginPage');
    if (localStorage.getItem("loged") == "login") {
      this.navCtrl.setRoot('LoginPage');
    }
  }


  Login(userProfile) {
    this.clickSignUp = true;
    if (userProfile.valid && this.emailFormControl.valid) {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      this.apiserver.postData(this.userData).then(result => {
        loading.dismiss();
        if (Object(result).status == "success") {
          localStorage.setItem("loged", "login");
          localStorage.setItem("useremail", this.userData.email);
          this.navCtrl.setRoot('LoginPage');
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
      // this.navCtrl.push(LoginPage);
    }
  }

  gotoSignup() {
    this.navCtrl.push('SignupPage');
  }

  forgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

}
