import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PendingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-detail',
  templateUrl: 'pending-detail.html',
})
export class PendingDetailPage {

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
    console.log('ionViewDidLoad PendingDetailPage');
    this.ionicInit();
  }

  back() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.transactionData = JSON.parse(localStorage.getItem("selectedPending"));
    this.originalInvestment = localStorage.getItem("pendingTotal");
    this.userData.email = localStorage.getItem("useremail");
    // let currentItem = JSON.parse(localStorage.getItem("tradeItem"));
    // this.propertyAddress1 = currentItem.property_address1;
    // this.propertyAddress2 = currentItem.property_address2;
    // if (this.propertyAddress2 == "") {
    //   this.addressName = this.propertyAddress1;
    // } else {
    //   this.addressName = this.propertyAddress1 + " " + this.propertyAddress2;
    // }
    // this.propertyCity = currentItem.property_city;
    // this.propertyState = currentItem.property_state;
    // this.propertyPostcode = currentItem.property_postcode;
    // this.propertyCountry = currentItem.property_country;
  }

  viewPDF() {
    var pdfurl = 'https://docs.google.com/gview?embedded=true&url=' + this.transactionData.penPDF;
    let target = "_blank";
    this.iab.create(encodeURI(pdfurl), target, this.options);
  }

  emailPDF() {
    localStorage.setItem("pdfURL", this.transactionData.penPDF);
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
