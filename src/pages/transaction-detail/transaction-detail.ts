import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the TransactionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  public userData = { "email": "", "apiState": "sendPDFFile", "pdfURL": "" };

  public originalInvestment: any;
  public searchDate: any;
  public dateIconName: any;

  public transactionData: any;
  public options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionDetailPage');
    this.ionicInit();
  }

  back() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.transactionData = JSON.parse(localStorage.getItem("selectedTransaction"));
    this.originalInvestment = localStorage.getItem("originalInvestment");
    this.userData.email = localStorage.getItem("useremail");
  }

  viewPDF() {
    var pdfurl = 'https://docs.google.com/gview?embedded=true&url=' + this.transactionData.tranPDF;
    let target = "_blank";
    this.iab.create(encodeURI(pdfurl), target, this.options);
  }

  emailPDF() {
    localStorage.setItem("pdfURL", this.transactionData.tranPDF);
    let modal = this.modalCtrl.create('EmailConfirmPage');
    modal.onDidDismiss(data => {
      if (data != "" && typeof (data) != "undefined") {
        let toast = this.toastCtrl.create({
          message: data,
          duration: 3000
        });
        toast.present();
      }
    });
    modal.present();
  }

}
