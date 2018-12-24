import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  public userData = { "email": "", "apiState": "getTransactionList" };

  public originalInvestment: any;
  public searchDate: any;
  public dateIconName: any;
  public transactionList: any[];
  public totalData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TransactionPage');
    this.getTransactionList();
  }

  getTransactionList() {

    this.originalInvestment = localStorage.getItem("originalInvestment");
    this.dateIconName = "";
    this.transactionList = new Array();
    this.totalData = new Array();

    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      if (Object(result).status == "success") {
        for (let list of Object(result).transactionList) {
          let tempTranList = { "tranDate": "", "tranDescription": "", "tranValue": "", "tranBalance": "", "tranTimestamp": "", "tranPDF": "" };
          tempTranList.tranDate = this.changeTimestampToDate(parseFloat(list.timestamp));
          tempTranList.tranBalance = list.account_balance;
          tempTranList.tranDescription = list.transaction_description;
          tempTranList.tranValue = list.transaction_value;
          tempTranList.tranTimestamp = list.timestamp;
          tempTranList.tranPDF = "http://traxprint.asia/" + list.pdf_location;
          this.transactionList.push(tempTranList);
          this.totalData.push(tempTranList);
        }
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

  searchDateClick() {
    this.transactionList = new Array();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (typeof (this.searchDate) != "undefined" && this.searchDate != "") {
      let searchDate = this.searchDate.split("-")[2] + " " + months[parseInt(this.searchDate.split("-")[1]) - 1] + " " + this.searchDate.split("-")[0];
      for (let list of this.totalData) {
        if (list.tranDate == searchDate) {
          this.transactionList.push(list);
        }
      }
    }
  }

  clearList() {
    this.searchDate = "";
    this.transactionList = new Array();
    for (let list of this.totalData) {
      this.transactionList.push(list);
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
    let length = this.transactionList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.transactionList[j].tranTimestamp) > parseFloat(this.transactionList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.transactionList[j];  //Temporary letiable to hold the current number
          this.transactionList[j] = this.transactionList[j + 1]; //Replace current number with adjacent number
          this.transactionList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  bubbleSortDecrease() {
    let length = this.transactionList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.transactionList[j].tranTimestamp) < parseFloat(this.transactionList[j + 1].tranTimestamp)) {
          //Swap the numbers
          let tmp = this.transactionList[j];  //Temporary letiable to hold the current number
          this.transactionList[j] = this.transactionList[j + 1]; //Replace current number with adjacent number
          this.transactionList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  gotoTransactionDetail(index) {
    localStorage.setItem("selectedTransaction", JSON.stringify(this.transactionList[index]));
    this.navCtrl.push('TransactionDetailPage');
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

  back() {
    this.navCtrl.pop();
  }

}
