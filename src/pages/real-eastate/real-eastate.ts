import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the RealEastatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-real-eastate',
  templateUrl: 'real-eastate.html',
})
export class RealEastatePage {

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

  public userData = { "email": "", "apiState": "realEstateApi" };

  public currentIndex: any;
  public totalData: any[];

  public pendingData = { "customer_id": "", "id": "", "pending_value": "", "property_id": "", "transaction_document": "", "transaction_timestamp": "", "transaction_type": "" };
  public pendingList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealEastatePage');
    this.currentIndex = 0;
    this.switchArrow = false;
    this.noProperty = true;
    this.getRealEstate();
  }

  getRealEstate() {
    this.totalData = new Array();
    this.pendingList = Array();
    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      console.log(result);
      if (Object(result).status == "success") {
        this.noProperty = false;
        for (let list of Object(result).realEstate) {
          this.totalData.push(list);
        }
        for (let list of Object(result).pendingList) {
          this.pendingList.push(list);
        }
        this.getNextItem();
      } else {
        this.noProperty = true;
      }
    }, error => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "No Network",
        duration: 2000
      });
      toast.present()
    })
  }

  jointlyBuilding() {
    console.log("jointlyBuilding");
  }

  gotoRealEstate() {
    // this.navCtrl.push(RealEastatePage);
  }

  clickBuy() {
    console.log("clickBuy");
    localStorage.setItem("tradeType", "buy");
    localStorage.setItem("tradeItem", JSON.stringify(this.totalData[this.currentIndex]));

    let currentItem = this.totalData[this.currentIndex];

    let changedValue = false;
    this.pendingData.property_id = currentItem.id;
    this.pendingData.customer_id = currentItem.customer_id;

    for (let list of this.pendingList) {
      if (currentItem.id == list.property_id && list.transaction_type == "Buy Shares") {
        this.pendingData.id = list.id;
        this.pendingData.pending_value = list.pending_value;
        this.pendingData.transaction_document = list.transaction_document;
        this.pendingData.transaction_timestamp = list.transaction_timestamp;
        this.pendingData.transaction_type = list.transaction_type;
        changedValue = true;
      }
    }

    if (changedValue) {
      console.log(this.pendingData);
      localStorage.setItem("pendingItem", JSON.stringify(this.pendingData));
    } else {
      this.pendingData.pending_value = "";
      console.log(this.pendingData);
      localStorage.setItem("pendingItem", JSON.stringify(this.pendingData));
    }
    this.navCtrl.push('TradeCenterPage');
  }

  clickSell() {
    console.log("clickSell");
    localStorage.setItem("tradeType", "sell");
    localStorage.setItem("tradeItem", JSON.stringify(this.totalData[this.currentIndex]));

    let changedValue = false;
    let currentItem = this.totalData[this.currentIndex];
    this.pendingData.property_id = currentItem.id;
    this.pendingData.customer_id = currentItem.customer_id;

    for (let list of this.pendingList) {
      if (currentItem.id == list.property_id && list.transaction_type == "Sell Shares") {
        this.pendingData.customer_id = list.customer_id;
        this.pendingData.id = list.id;
        this.pendingData.pending_value = list.pending_value;
        this.pendingData.transaction_document = list.transaction_document;
        this.pendingData.transaction_timestamp = list.transaction_timestamp;
        this.pendingData.transaction_type = list.transaction_type;
        changedValue = true;
      }
    }

    if (changedValue) {
      console.log(this.pendingData);
      localStorage.setItem("pendingItem", JSON.stringify(this.pendingData));
    } else {
      this.pendingData.pending_value = "";
      console.log(this.pendingData);
      localStorage.setItem("pendingItem", JSON.stringify(this.pendingData));
    }
    this.navCtrl.push('TradeCenterPage');
  }

  accessCode() {
    console.log("accessCode");
  }

  findEstateAgent() {
    console.log("findEstateAgent");
    localStorage.setItem("verifyType", "realEstate");
    this.navCtrl.push('IdVerifyPage');
  }

  getNextItem() {
    let currentItem = this.totalData[this.currentIndex];

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
    this.currentMV = "$" + this.changeToDecimal(currentItem.current_mv);
    if (currentItem.current_equity == currentItem.current_mv) {
      this.equityValue = "100%";
    } else {
      this.equityValue = "$" + this.changeToDecimal(currentItem.current_equity);
    }
    this.debtValue = "$" + currentItem.debt_balance;
    this.swapsValue = "$" + currentItem.eq_share_swap;
    this.pendingShareBuy = "$" + currentItem.pending_share_buy;
    this.pendingShareSell = "$" + currentItem.pending_share_sell;
  }

  clickNext() {
    // if (this.currentIndex + 1 > this.totalData.length - 1) {
    //   this.switchArrow = true;
    // } else {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex == this.totalData.length - 1) {
      this.switchArrow = true;
    } else {
      this.switchArrow = false;
    }
    // }

    this.getNextItem();
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  clickBefore() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex == 0) {
      this.switchArrow = false;
    } else {
      this.switchArrow = true;
    }
    this.getNextItem();
  }

}
