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



  public chartLabels = ['Gold', 'Silver', 'USD', 'AUD'];
  public chartColors = ['#ffdf00', '#d3d3d3', '#85bb65', '#012169'];
  public chartData = [100, 150, 130, 500];
  public chartType = 'line';
  public enableShowChat = false;

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Gold', lineTension: 0 },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Silver', lineTension: 0 },
    { data: [23, 38, 48, 89, 26, 67, 20], label: 'USD', lineTension: 0 },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'AUD', lineTension: 0 }
  ];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Array<any> = [1, 2, 3, 4, 5, 6, 7];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      fullWidth: true,
    }
  };
  public lineChartColors: any[];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.getLiveData();
    this.selectType(0);
    this.setChatColors();
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
        this.orgInvestment = this.changeToDecimal(Object(result).liveFeed.original_investment);
        this.dailyYield = parseFloat(Object(result).liveFeed.daily_yeild);
        this.perSecondValue = this.dailyYield / 24 / 60 / 60;
        // this.realLiveFeed = this.changeToDecimal(Object(result).live_value);
        // this.liveFeed = this.changeToDecimal(Object(result).live_value);
        this.updatedTimestamp = this.changeToDecimal(Object(result).liveFeed.updated_timestamp);
        this.currentTimestamp = this.changeToDecimal(Object(result).currentTimestamp);
        this.liveFeed = this.changeToDecimal(parseFloat(Object(result).liveFeed.live_value) + (this.perSecondValue * (this.currentTimestamp - this.updatedTimestamp)));
        this.realLiveFeed = (parseFloat(Object(result).liveFeed.live_value) + (this.perSecondValue * (this.currentTimestamp - this.updatedTimestamp)));

        this.calculateLiveFeed();
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
      this.liveFeed = this.changeToDecimal(this.realLiveFeed);
      this.calculateLiveFeed();
    }, 1000);
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  liveFeedCall() {
    console.log("liveFeedCall");
  }

  accessCode() {
    console.log("accessCode");
  }

  clickBuy() {
    console.log("clickBuy");
    localStorage.setItem("tradeType", "buy");
    this.navCtrl.push('TradeCenterPage');
  }

  clickSell() {
    console.log("clickSell");
    localStorage.setItem("tradeType", "sell");
    this.navCtrl.push('TradeCenterPage');
  }

  gotoRealEstate() {
    this.navCtrl.push('PendingPage');
  }

  gotoTransaction() {
    localStorage.setItem("originalInvestment", this.orgInvestment);
    this.navCtrl.push('TransactionPage');
  }

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  selectType(index) {
    this.dataType = this.dataList[index];
    if (this.dataList[index] === 'Monthly') {
      // this.lineChartLabels = this.monthList;
      this.setChartLineLabels(this.monthList);
      this.setChatList(this.monthList.length);
    }
    else if (this.dataList[index] === 'Weekly') {
      // this.lineChartLabels = this.weekList;
      this.setChatList(this.weekList.length);
      this.setChartLineLabels(this.weekList);
    }
    else if (this.dataList[index] === 'Daily') {
      // this.lineChartLabels = this.weekList;
      this.setChatList(this.dailyList.length);
      this.setChartLineLabels(this.dailyList);
    }
  }

  setChartLineLabels(lineValues) {
    this.lineChartLabels.length = 0;
    for (let list of lineValues) {
      this.lineChartLabels.push(list);
    }
  }

  setChatList(arrayNumber) {
    this.lineChartData = new Array();
    for (let list of this.chartLabels) {
      let eachChat = { data: [], label: list, lineTension: 0 }
      for (let i = 0; i < arrayNumber; i++) {
        eachChat.data.push(Math.floor(Math.random() * 150) + 1);
      }
      console.log(eachChat);
      this.lineChartData.push(eachChat);
    }
  }

  setChatColors() {
    this.lineChartColors = new Array();
    for (let list of this.chartColors) {
      let eachColor = {
        backgroundColor: '',
        borderColor: '',
        pointBackgroundColor: '',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: ''
      }
      eachColor.backgroundColor = list + "33";
      eachColor.borderColor = list;
      eachColor.pointBackgroundColor = list;
      eachColor.pointHoverBorderColor = list;
      this.lineChartColors.push(eachColor);
      console.log("set enable");
    }
    this.enableShowChat = true;

  }

}
