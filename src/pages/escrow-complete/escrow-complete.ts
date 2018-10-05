import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the EscrowCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escrow-complete',
  templateUrl: 'escrow-complete.html',
})
export class EscrowCompletePage {


  public userData = { "email": "", "apiState": "getCompleteList", "propertyID": "", "controllerID": "" };

  public userDetail: any;

  public originalInvestment = 0.0;
  public searchDate: any;
  public dateIconName: any;
  public completeList: any[];
  public totalData: any[];

  public addressName: any;
  public propertyAddress1: any;
  public propertyAddress2: any;
  public propertyCity: any;
  public propertyState: any;
  public propertyPostcode: any;
  public propertyCountry: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiserver: ServerProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscrowCompletePage');
    this.getCompleteData();
  }

  getCompleteData() {
    this.completeList = new Array();
    this.totalData = new Array();
    this.userData.email = localStorage.getItem("useremail");
    this.userData.controllerID = localStorage.getItem("controllerID");

    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      console.log(result);
      loading.dismiss();
      if (Object(result).status == "success") {
        for (let list of Object(result).completeList) {
          let tempTranList = { "comDate": "", "comDes": "", "comPDF": "", "comValue": "", "comVerify": "", "comTimestamp": "", "comSelID": "", "comBuyID": "", "comDisID": "", "comEnd": "" };
          tempTranList.comDate = this.changeTimestampToDate(parseFloat(list.distribution_date));
          tempTranList.comDes = list.distribution_description;
          tempTranList.comValue = list.distribution_value;
          tempTranList.comVerify = list.user_verified;
          tempTranList.comTimestamp = list.distribution_date;
          tempTranList.comPDF = "http://traxprint.asia/" + list.document_location;
          tempTranList.comEnd = this.changeTimestampToDate(parseFloat(list.completed_date_timestamp));

          tempTranList.comSelID = list.seller_id;
          tempTranList.comBuyID = list.buyer_id;
          tempTranList.comDisID = list.distribution_id;

          this.completeList.push(tempTranList);
          this.totalData.push(tempTranList);
        }
        this.userDetail = Object(result).userDetail;
        localStorage.setItem("escrowUser", JSON.stringify(Object(result).userDetail));
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


  orderDate() {
    if (this.dateIconName == "" || this.dateIconName == "md-arrow-dropup") {
      // this.bubbleSortIncrease();
      this.dateIconName = "md-arrow-dropdown"
    } else if (this.dateIconName == "md-arrow-dropdown") {
      // this.bubbleSortDecrease();
      this.dateIconName = "md-arrow-dropup";
    }
  }


  bubbleSortIncrease() {
    let length = this.completeList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.completeList[j].tranTimestamp) > parseFloat(this.completeList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.completeList[j];  //Temporary letiable to hold the current number
          this.completeList[j] = this.completeList[j + 1]; //Replace current number with adjacent number
          this.completeList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  bubbleSortDecrease() {
    let length = this.completeList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.completeList[j].tranTimestamp) < parseFloat(this.completeList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.completeList[j];  //Temporary letiable to hold the current number
          this.completeList[j] = this.completeList[j + 1]; //Replace current number with adjacent number
          this.completeList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  changeTimestampToDate(inputData) {
    let a = new Date(inputData * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year;
    return time;
  }

  gotoTransactionDetail(index) {
    localStorage.setItem("completeEscrowData", JSON.stringify(this.completeList[index]));
    this.navCtrl.push('EscrowCompleteDetailPage');
  }

  back() {
    this.navCtrl.setRoot('EascrowPage');
  }

}
