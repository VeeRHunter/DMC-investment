import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the EscrowPendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escrow-pending',
  templateUrl: 'escrow-pending.html',
})
export class EscrowPendingPage {


  public userData = { "email": "", "apiState": "getEscrowPendingList", "propertyID": "", "controllerID": "" };

  public originalInvestment = 0.0;
  public searchDate: any;
  public dateIconName: any;
  public pendingList: any[];
  public totalData: any[];
  public userDetail: any;

  public addressName: any;
  public propertyAddress1: any;
  public propertyAddress2: any;
  public propertyCity: any;
  public propertyState: any;
  public propertyPostcode: any;
  public propertyCountry: any;

  public bankName = "";
  public bankAccountName = "";
  public bankBSB = "";
  public bankAccountNumber = "";
  public bankChangedBSB = "";
  public bankChangedAccountNumber = "";
  public bankCheck = false;
  public bankShow = false;
  public bankID = "";
  public switchSubmit = false;
  public bankType = "number";

  public verifyAmount1 = "";
  public verifyAmount2 = "";
  public verifyCheck = false;
  public verifyShow = false;

  public bsbCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]{6}$")
  ])

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiserver: ServerProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscrowPendingPage');
    this.verifyAmount1 = (0).toFixed(2);
    this.verifyAmount2 = (0).toFixed(2);
    localStorage.setItem("bankDetailChange", "unChange");
    this.getPendingData();
  }

  getPendingData() {
    this.pendingList = new Array();
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
        for (let list of Object(result).pendingList) {
          let tempTranList = { "penDate": "", "penDes": "", "penPDF": "", "penValue": "", "penVerify": "", "penTimestamp": "", "penSelID": "", "penBuyID": "", "penDisID": "" };
          tempTranList.penDate = this.changeTimestampToDate(parseFloat(list.distribution_date));
          tempTranList.penDes = list.distribution_description;
          tempTranList.penValue = list.distribution_value;
          tempTranList.penVerify = this.compareDate(list.distribution_date);
          tempTranList.penTimestamp = list.distribution_date;
          tempTranList.penPDF = "http://traxprint.asia/" + list.document_location;

          tempTranList.penSelID = list.seller_id;
          tempTranList.penBuyID = list.buyer_id;
          tempTranList.penDisID = list.distribution_id;

          this.pendingList.push(tempTranList);
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

  compareDate(inputDate) {
    let currentTime = Math.floor(new Date().getTime() / 1000);
    if (parseFloat(inputDate) > currentTime) {
      return "1";
    } else {
      return "0";
    }
  }

  bankDetail() {
    // if (!this.bankCheck) {
    this.bankShow = !this.bankShow;
    // }
  }

  bankSubmit() {

    this.bsbCtrl.setValue(this.bankBSB);
    if (this.bankName != "" && this.bankAccountName != "" && this.bankAccountNumber != "" && this.bankBSB != "") {


      if (!this.bsbCtrl.valid) {
        let toast = this.toastCtrl.create({
          message: "You must input 6 digits for BSB",
          duration: 2000
        });
        toast.present();
      } else {
        let sendData;
        if (localStorage.getItem("bankDetailChange") == "Change") {
          sendData = { "email": this.userData.email, "apiState": "bankDetailUpdate", "userId": "", "backName": this.bankName, "accName": this.bankAccountName, "bsb": this.bankBSB, "accNumber": this.bankAccountNumber, "verified": "", "bankID": "" };
          sendData.bankID = this.bankID;
          sendData.userId = this.userDetail.user_id;
          sendData.verified = this.userDetail.user_verified;
        } else {
          sendData = { "email": this.userData.email, "apiState": "bankDetail", "userId": "", "backName": this.bankName, "accName": this.bankAccountName, "bsb": this.bankBSB, "accNumber": this.bankAccountNumber, "verified": "" };
          sendData.userId = this.userDetail.user_id;
          sendData.verified = this.userDetail.user_verified;
        }

        let loading = this.loadingCtrl.create({
          content: "Please Wait..."
        });
        loading.present();

        this.apiserver.postData(sendData).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.bankChangedBSB = this.bankBSB;
            this.bankChangedAccountNumber = this.bankAccountNumber;
            this.bankCheck = true;
            this.bankShow = !this.bankShow;
            this.switchSubmit = !this.switchSubmit;

            this.bankType = "text";
            this.bankBSB = this.changeBankDetail(this.bankBSB.toString());
            this.bankAccountNumber = this.changeBankDetail(this.bankAccountNumber.toString());
            localStorage.setItem("bankDetailChange", "unChange");

            this.bankID = Object(result).bankID;
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
    } else {
      let toast = this.toastCtrl.create({
        message: "Please input all data",
        duration: 2000
      });
      toast.present();
    }

  }

  changeBankDetail(inputData) {
    let returnData = inputData.charAt(0);
    for (let i = 1; i < inputData.length - 1; i++) {
      returnData = returnData + "*";
    }
    returnData = returnData + inputData.charAt(inputData.length - 1);
    console.log(returnData);
    return returnData;
  }

  bankChange() {
    this.bankBSB = this.bankChangedBSB;
    this.bankAccountNumber = this.bankChangedAccountNumber;
    localStorage.setItem("bankDetailChange", "Change");
    this.bankType = "number";
    this.switchSubmit = !this.switchSubmit;
  }

  accountSubmit() {
    if (this.verifyAmount1 != "" && this.verifyAmount2 != "") {
      if (!this.bankCheck) {
        this.verifyShow = false;
        this.bankShow = true;
      } else {
        let sendData = { "email": this.userData.email, "apiState": "backVerify", "bankID": this.bankID, "amount1": this.verifyAmount1, "amount2": this.verifyAmount2, "verify": this.userDetail.user_verified };

        let loading = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loading.present();
        this.apiserver.postData(sendData).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.verifyShow = !this.verifyAccount;
            this.verifyCheck = true;
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
    } else {
      let toast = this.toastCtrl.create({
        message: "Please input all data",
        duration: 2000
      });
      toast.present();
    }
  }

  verifyAccount() {
    if (this.bankCheck) {
      if (!this.verifyCheck) {
        this.verifyShow = !this.verifyShow;
      }
    } else {
      let toast = this.toastCtrl.create({
        message: "Please input Bank Detil first",
        duration: 2000
      });
      toast.present();
    }
  }

  focusOnAmount1() {

  }

  focusOutAmount1() {
    this.verifyAmount1 = parseFloat(this.verifyAmount1).toFixed(2);
  }

  focusOnAmount2() {

  }

  focusOutAmount2() {
    this.verifyAmount2 = parseFloat(this.verifyAmount2).toFixed(2);
  }

  verifyUser(index) {
    let sendData = { "email": this.userData.email, "apiState": "verifyBankEscrow", "penDes": "", "penValue": "", "penVerify": "", "penTimestamp": "", "penSelID": "", "penBuyID": "", "penDisID": "", "controllerID": "" };
    if (this.userDetail.user_verified == "0") {
    } else {
      sendData.penBuyID = this.pendingList[index].penBuyID;
      sendData.penSelID = this.pendingList[index].penSelID;
      sendData.penDisID = this.pendingList[index].penDisID;
      sendData.penDes = this.pendingList[index].penDes;
      sendData.penValue = this.pendingList[index].penValue;
      sendData.penVerify = this.pendingList[index].penVerify;
      sendData.penTimestamp = this.pendingList[index].penTimestamp;
      sendData.controllerID = this.userData.controllerID;
      let loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loading.present();
      this.apiserver.postData(sendData).then(result => {
        loading.dismiss();
        console.log(result);
        if (Object(result).status == "success") {
          this.pendingList = new Array();
          for (let list of Object(result).pendingList) {
            let tempTranList = { "penDate": "", "penDes": "", "penPDF": "", "penValue": "", "penVerify": "", "penTimestamp": "", "penSelID": "", "penBuyID": "", "penDisID": "" };
            tempTranList.penDate = this.changeTimestampToDate(parseFloat(list.distribution_date));
            tempTranList.penDes = list.distribution_description;
            tempTranList.penValue = list.distribution_value;
            tempTranList.penVerify = list.user_verified;
            tempTranList.penTimestamp = list.distribution_date;
            tempTranList.penPDF = "http://traxprint.asia/" + list.document_location;

            tempTranList.penSelID = list.seller_id;
            tempTranList.penBuyID = list.buyer_id;
            tempTranList.penDisID = list.distribution_id;

            this.pendingList.push(tempTranList);
            this.totalData.push(tempTranList);
          }
          console.log(this.pendingList);
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
      });
    }
  }


  orderDate() {
    if (this.dateIconName == "" || this.dateIconName == "md-arrow-dropup") {
      this.bubbleSortIncrease();
      this.dateIconName = "md-arrow-dropdown"
    } else if (this.dateIconName == "md-arrow-dropdown") {
      this.bubbleSortDecrease();
      this.dateIconName = "md-arrow-dropup";
    }
  }


  bubbleSortIncrease() {
    let length = this.pendingList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.pendingList[j].tranTimestamp) > parseFloat(this.pendingList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.pendingList[j];  //Temporary letiable to hold the current number
          this.pendingList[j] = this.pendingList[j + 1]; //Replace current number with adjacent number
          this.pendingList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  bubbleSortDecrease() {
    let length = this.pendingList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.pendingList[j].tranTimestamp) < parseFloat(this.pendingList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.pendingList[j];  //Temporary letiable to hold the current number
          this.pendingList[j] = this.pendingList[j + 1]; //Replace current number with adjacent number
          this.pendingList[j + 1] = tmp; //Replace adjacent number with current number
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
    localStorage.setItem("pendingEscrowData", JSON.stringify(this.pendingList[index]));
    this.navCtrl.push('EscrowPendingDetailPage');
  }

  back() {
    this.navCtrl.setRoot('EascrowPage');
  }

}
