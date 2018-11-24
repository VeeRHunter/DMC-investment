import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
// import { NoopScrollStrategy } from '../../../node_modules/@angular/cdk/overlay';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public orgInvestment: any;
  public dailyYield: any;
  public liveFeed: any;

  public realLiveFeed: any;
  public updatedTimestamp: any;
  public currentTimestamp: any;

  public perSecondValue: any;

  public userData = { "email": "", "apiState": "liveFeed" };

  public dataList = ['Monthly', 'Weekly', 'Daily'];
  public dataType: any;
  public monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  public weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public dailyList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];


  public investmentValue: any;
  public currentYield: any;
  public percentGrowth: any;
  public percentGrowthValue: any;
  public percentState: boolean;

  public showPage = false;


  public colorList: any[];
  public showDataList: any[];

  public orgDataList: any;
  public orgDetailList: any;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public apiserver: ServerProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.colorList = new Array();
    this.showDataList = new Array();
    this.getLiveData();
  }

  getLiveData() {

    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      console.log(result);
      if (Object(result).status == "success") {
        this.currentYield = this.changeToDecimal(Object(result).liveFeed.original_investment);
        this.dailyYield = parseFloat(Object(result).liveFeed.daily_yeild);
        this.perSecondValue = this.dailyYield / 24 / 60 / 60;
        // this.realLiveFeed = this.changeToDecimal(Object(result).live_value);
        // this.liveFeed = this.changeToDecimal(Object(result).live_value);
        this.updatedTimestamp = this.changeToDecimal(Object(result).liveFeed.updated_timestamp);
        this.currentTimestamp = this.changeToDecimal(Object(result).currentTimestamp);
        this.investmentValue = this.changeToDecimal(parseFloat(Object(result).liveFeed.live_value) + (this.perSecondValue * (this.currentTimestamp - this.updatedTimestamp)));
        this.realLiveFeed = (parseFloat(Object(result).liveFeed.live_value) + (this.perSecondValue * (this.currentTimestamp - this.updatedTimestamp)));

        this.calculatePercentage();
        this.calculateLiveFeed();

        this.orgDataList = Object(result).currencyDataList;
        this.orgDetailList = Object(result).currencyDetailList;
        this.getTotalData();

        // Set graph data

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

  calculateLiveFeed() {
    setTimeout(() => {
      this.realLiveFeed = this.realLiveFeed + this.dailyYield / 24 / 60 / 60;
      this.investmentValue = this.changeToDecimal(this.realLiveFeed);
      this.calculatePercentage();
      this.calculateLiveFeed();
    }, 1000);
  }

  calculatePercentage() {
    this.percentGrowthValue = ((this.investmentValue - this.currentYield) / this.currentYield) * 100;
    if (this.investmentValue - this.currentYield > 0) {
      this.percentGrowth = "+" + this.changeToDecimal(this.percentGrowthValue) + "%";
    } else if (this.investmentValue - this.currentYield == 0) {
      this.percentGrowth = this.changeToDecimal(this.percentGrowthValue) + "%";
    } else {
      this.percentGrowth = "-" + this.changeToDecimal(this.percentGrowthValue) + "%";
    }
    if (this.percentGrowth.includes("-")) {
      this.percentState = true;
    } else {
      this.percentState = false;
    }
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    let availableState = true;
    for (let list of this.colorList) {
      if (list === color) {
        availableState = false;
      }
    }
    if (availableState) {
      this.colorList.push(color);
      return color;
    } else {
      this.getRandomColor();
    }
  }

  getTotalData() {

    for (let list of this.orgDataList) {
      let eachArrayValue = {
        "bigTitle": "", "smallTitle": "", "currentCurrency": "", "dailyPercent": "", "dailyDis": ""
        , "classState": false, "image": "", "borderColor": "", "chartData": [],
      };
      eachArrayValue.bigTitle = list.cl_name;
      eachArrayValue.smallTitle = list.cl_ShortName;
      this.bubbleSortIncrease();
      eachArrayValue.currentCurrency = this.orgDetailList[this.orgDetailList.length - 1][list.cl_currencyTableColumn];
      let orignalCurrency = this.orgDetailList[0][list.cl_currencyTableColumn];
      let beforeCurrency = parseFloat(eachArrayValue.currentCurrency) - parseFloat(orignalCurrency);
      eachArrayValue.dailyPercent = this.changeToDecimal((beforeCurrency / parseFloat(eachArrayValue.currentCurrency) * 100)) + "%";
      if (beforeCurrency < 0) {
        eachArrayValue.classState = true;
        eachArrayValue.dailyDis = "-$" + this.changeToDecimal(Math.abs(beforeCurrency));
      } else if (beforeCurrency === 0) {
        eachArrayValue.dailyDis = "$" + this.changeToDecimal(Math.abs(beforeCurrency));
      } else {
        eachArrayValue.dailyPercent = "+" + eachArrayValue.dailyPercent;
        eachArrayValue.dailyDis = "+$" + this.changeToDecimal(Math.abs(beforeCurrency));
      }
      eachArrayValue.image = "http://traxprint.asia/dmc-investment/images/flags/" + list.cl_logoLocation;
      eachArrayValue.borderColor = this.getRandomColor();

      for (let chartDetail of this.orgDetailList) {
        let eachChart = { "date": "", "value": "" };
        eachChart.date = chartDetail.currency_timestamp;
        eachChart.value = chartDetail[list.cl_currencyTableColumn];
        eachArrayValue.chartData.push(eachChart);
      }



      this.showDataList.push(eachArrayValue);
    }
    console.log(this.showDataList);
    this.showPage = true;
  }

  goCurrency(index) {
    let investParam = { "investmentValue": this.investmentValue, "disValue": "", "disPercent": "" };
    if (this.realLiveFeed - this.currentYield > 0) {
      investParam.disValue = "+$" + this.changeToDecimal(this.realLiveFeed - this.currentYield);
    } else if (this.realLiveFeed - this.currentYield == 0) {
      investParam.disValue = "$" + this.changeToDecimal(this.realLiveFeed - this.currentYield);
    } else {
      investParam.disValue = "-$" + this.changeToDecimal(this.realLiveFeed - this.currentYield);
    }
    investParam.disPercent = this.percentGrowth;
    this.navCtrl.push('CurrencyPage', { chartData: this.showDataList, investmentValue: investParam });
  }



  bubbleSortIncrease() {
    let length = this.orgDetailList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.orgDetailList[j].currency_timestamp) > parseFloat(this.orgDetailList[j + 1].currency_timestamp)) {
          //Swap the numbers
          let tmp = this.orgDetailList[j];  //Temporary letiable to hold the current number
          this.orgDetailList[j] = this.orgDetailList[j + 1]; //Replace current number with adjacent number
          this.orgDetailList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  bubbleSortDecrease() {
    let length = this.orgDetailList.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.orgDetailList[j].currency_timestamp) < parseFloat(this.orgDetailList[j + 1].currency_timestamp)) {
          //Swap the numbers
          let tmp = this.orgDetailList[j];  //Temporary letiable to hold the current number
          this.orgDetailList[j] = this.orgDetailList[j + 1]; //Replace current number with adjacent number
          this.orgDetailList[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  goDashBoard() {
    this.navCtrl.setRoot('MainPage');
  }

  goReceipt() {
    this.navCtrl.push('TransactionPage');
  }

  logOut() {
    localStorage.setItem("loged", "");
    this.navCtrl.setRoot('InitialLoginPage');
  }

}
