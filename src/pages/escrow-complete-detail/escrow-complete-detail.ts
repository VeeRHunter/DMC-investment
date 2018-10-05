import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser, InAppBrowserOptions } from '../../../node_modules/@ionic-native/in-app-browser';

/**
 * Generated class for the EscrowCompleteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escrow-complete-detail',
  templateUrl: 'escrow-complete-detail.html',
})
export class EscrowCompleteDetailPage {

  public userData = { "email": "", "apiState": "sendPDFFile", "pdfURL": "" };

  public completeData: any;

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

  public addressName: any;
  public propertyAddress1: any;
  public propertyAddress2: any;
  public propertyCity: any;
  public propertyState: any;
  public propertyPostcode: any;
  public propertyCountry: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private iab: InAppBrowser, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscrowPendingDetailPage');
    this.completeData = JSON.parse(localStorage.getItem("completeEscrowData"));
    this.userData.email = localStorage.getItem("useremail");
    this.addressName = JSON.parse(localStorage.getItem("escrowUser")).user_address;
  }

  back() {
    this.navCtrl.pop();
  }

  viewPDF() {
    var pdfurl = 'https://docs.google.com/gview?embedded=true&url=' + this.completeData.comPDF;
    let target = "_blank";
    this.iab.create(encodeURI(pdfurl), target, this.options);
  }

  emailPDF() {
    localStorage.setItem("pdfURL", this.completeData.penPDF);
    let modal = this.modalCtrl.create('EmailConfirmPage');
    modal.onDidDismiss(data => {
      console.log(data);
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
