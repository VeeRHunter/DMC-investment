import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the TradeCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-center',
  templateUrl: 'trade-center.html',
})
export class TradeCenterPage {
  @ViewChild(Content) content: Content;


  public smallPageTitle: any;
  public addressName: any;
  public propertyAddress1: any;
  public propertyAddress2: any;
  public propertyCity: any;
  public propertyState: any;
  public propertyPostcode: any;
  public propertyCountry: any;
  public currentMV: any;
  public equityValue: any;
  public debtValue: any;
  public swapsValue: any;
  public pendingShareBuy: any;
  public pendingShareSell: any;

  public debtTitle: any;
  public buildingImage: any;

  public swichEquity: boolean;
  public noProperty: boolean;
  public switchjointly: boolean;
  public switchMortgage: boolean;
  public switchArrow: boolean;

  public showEditEquityValue = false;
  public jointlyOwned: boolean;

  public equitySwapValue: any;
  public equityPercent: any;
  public balanceEquityValue: any;
  public dmcShareValue: any;

  public swapMax: any;

  public tradeTypeTitle: any;
  public confirmTypeTitle: any;
  public switchTrade: boolean;

  public pendingVlaue: any;
  public pendingData = 0.0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeCenterPage');
    this.getTradeItem();


  }

  focusOnEquityValue() {
    console.log("Focus On");
    let itemTop = document.getElementById('inputEquity').offsetTop;
    let itemPositionY = this.content.getContentDimensions().scrollTop + itemTop;
    console.log(itemTop);
    console.log(itemPositionY);
    this.content.scrollTo(null, itemPositionY, 500);
    this.showEditEquityValue = true;
  }

  focusOutEquityValue() {
    console.log("focusOutEquityValue");
    if (this.equitySwapValue > this.swapMax) {
      this.equitySwapValue = this.swapMax;
      let toast = this.toastCtrl.create({
        message: "You can't set more than 95% of current price",
        duration: 2000
      });
      toast.present();
    } else if (this.equitySwapValue < 0) {
      this.equitySwapValue = (0).toFixed(2);
      let toast = this.toastCtrl.create({
        message: "You can't set less than 0",
        duration: 2000
      });
      toast.present();
    }
    else {
      this.equitySwapValue = parseFloat(this.equitySwapValue).toFixed(2);
    }
    this.showEditEquityValue = false;
  }

  checkEquityValue() {
  }

  openEditValue() {
    // openEditValue.setfocus();
    this.showEditEquityValue = true;
  }

  goback() {
    this.navCtrl.pop();
  }

  confirmTrade() {

    if (this.equitySwapValue == 0) {
      let toast = this.toastCtrl.create({
        message: "Please Input Equity Swap Amount",
        duration: 2000
      });
      toast.present();
    } else {
      localStorage.setItem("confirmValue", this.equitySwapValue);
      let modal = this.modalCtrl.create('ConfirmModalPage');
      modal.onDidDismiss(data => {
        console.log(data);
        if (data != null) {
          if (data.status == "success") {
            let toast = this.toastCtrl.create({
              message: "Success Confirm",
              duration: 3000
            });
            toast.present();
            if (parseFloat(data.data) > 0) {
              this.pendingVlaue = "$" + data.data;
            } else {
              this.pendingVlaue = "-$" + Math.abs(data.data);
            }
          }
        }
      });
      modal.present();
    }
  }

  getTradeItem() {

    if (localStorage.getItem("tradeType") == "buy") {
      this.tradeTypeTitle = "Trade Desk Buy";
      this.confirmTypeTitle = "Confirm Buy";
      this.switchTrade = true;
    } else if (localStorage.getItem("tradeType") == "sell") {
      this.tradeTypeTitle = "Trade Desk Sell";
      this.confirmTypeTitle = "Confirm Sell";
      this.switchTrade = false;
    }

    let currentItem = JSON.parse(localStorage.getItem("tradeItem"));
    if (currentItem.jointly_owned == "1") {
      this.switchjointly = true;
    } else {
      this.switchjointly = false;
    }

    if (currentItem.property_mortgaged == "0") {
      this.smallPageTitle = "FREE HOLD";
      this.switchMortgage = false;
    } else {
      this.smallPageTitle = "UNDER MORTGAGE";
      this.switchMortgage = true;
    }

    this.buildingImage = "http://traxprint.asia/" + currentItem.image_location;
    this.propertyAddress1 = currentItem.property_address1;
    this.propertyAddress2 = currentItem.property_address2;
    if (this.propertyAddress2 == "") {
      this.addressName = this.propertyAddress1;
    } else {
      this.addressName = this.propertyAddress1 + " " + this.propertyAddress2;
    }
    this.propertyCity = currentItem.property_city;
    this.propertyState = currentItem.property_state;
    this.propertyPostcode = currentItem.property_postcode;
    this.propertyCountry = currentItem.property_country;
    this.currentMV = this.changeToDecimal(currentItem.current_mv);
    if (currentItem.current_equity == currentItem.current_mv) {
      this.equityValue = "100%";
    } else {
      this.equityValue = "$" + this.changeToDecimal(currentItem.current_equity);
    }
    this.debtValue = "$" + currentItem.debt_balance;
    this.swapsValue = currentItem.eq_share_swap + "%";
    this.pendingShareBuy = currentItem.pending_share_buy + "%";
    this.pendingShareSell = currentItem.pending_share_sell + "%";
    this.equitySwapValue = (0.00).toFixed(2);
    if (JSON.parse(localStorage.getItem("pendingItem")).pending_value != null && JSON.parse(localStorage.getItem("pendingItem")).pending_value != "") {
      this.pendingData = parseFloat(JSON.parse(localStorage.getItem("pendingItem")).pending_value);
      if (parseFloat(JSON.parse(localStorage.getItem("pendingItem")).pending_value) > 0) {
        this.pendingVlaue = "$" + JSON.parse(localStorage.getItem("pendingItem")).pending_value;
      } else {
        this.pendingVlaue = "-$" + Math.abs(JSON.parse(localStorage.getItem("pendingItem")).pending_value);
      }
      this.swapMax = ((parseFloat(this.currentMV) - this.pendingData) * 0.95).toFixed(2);
    } else {
      this.swapMax = (parseFloat(this.currentMV) * 0.95).toFixed(2);
    }
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  gotoPendingPage() {
    this.navCtrl.push('PendingPage');
  }



}
