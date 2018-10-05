import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the EmailConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-confirm',
  templateUrl: 'email-confirm.html',
})
export class EmailConfirmPage {

  public userData = { "email": "", "apiState": "sendPDFFile", "pdfURL": "" };
  public otherEmail: any;
  public confirmEmail: boolean;

  public emailCtrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController
    , public toastCtrl: ToastController, public apiserver: ServerProvider, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailConfirmPage');
    this.confirmEmail = true;
  }

  sendEmail() {
    if (this.confirmEmail) {
      this.userData.email = localStorage.getItem("useremail");
      this.requestSendEmail();
    } else {
      if (this.emailCtrl.valid) {
        this.userData.email = this.otherEmail;
        this.requestSendEmail();
      }
    }
  }

  requestSendEmail() {
    this.userData.pdfURL = localStorage.getItem("pdfURL");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      console.log(result);
      this.closeModal(Object(result).detail);
    }, error => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "No Network",
        duration: 2000
      });
      toast.present();
    });
  }

  goback() {
    this.navCtrl.pop();
  }

  closeModal(data) {
    this.viewCtrl.dismiss(data);
  }

}
