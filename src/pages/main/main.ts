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
  public percentState: boolean;


  public colorList: any[];
  public showDataList: any[];

  public orgDataList = [
    {
      "bigTitle": "Bitcoin", "smallTitle": "BTC",
      "totalValue": "+$16648.62", "changeValue": "-$822.62",
      "chanagePercent": "7.22%", "image": "Bahrain"
    },
    {
      "bigTitle": "Bitcoin Cash", "smallTitle": "BCH",
      "totalValue": "+$824.46", "changeValue": "$64.42",
      "chanagePercent": "2.8%", "image": "canada"
    },
    {
      "bigTitle": "Ethereum", "smallTitle": "ETH",
      "totalValue": "+$482.24", "changeValue": "-$46.68",
      "chanagePercent": "-27.6%", "image": "brunei"
    },
    {
      "bigTitle": "Gold", "smallTitle": "Gold",
      "totalValue": "+$482.24", "changeValue": "$46.68",
      "chanagePercent": "17.6%", "image": "cayman"
    },
    {
      "bigTitle": "Euro", "smallTitle": "Euro",
      "totalValue": "+$482.24", "changeValue": "$46.68",
      "chanagePercent": "-7.6%", "image": "euro"
    },
    {
      "bigTitle": "GB", "smallTitle": "GB",
      "totalValue": "+$482.24", "changeValue": "-$46.68",
      "chanagePercent": "2.6%", "image": "GB"
    }
  ];




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
    this.getTotalData();
    // this.getLiveData();
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

    this.investmentValue = "$3136.06";
    this.currentYield = "+$2070.04";
    this.percentGrowth = "-$151.87";
    if (this.percentGrowth.includes("-")) {
      this.percentState = true;
    } else {
      this.percentState = false;
    }


    for (let list of this.orgDataList) {
      let eachArrayValue = {
        "bigTitle": "", "smallTitle": "", "currentCurrency": "", "dailyPercent": ""
        , "classState": false, "image": "", "borderColor": "",
      };
      eachArrayValue.bigTitle = list.bigTitle;
      eachArrayValue.smallTitle = list.smallTitle;
      eachArrayValue.currentCurrency = list.totalValue;
      eachArrayValue.dailyPercent = list.chanagePercent;
      if (eachArrayValue.dailyPercent.includes("-")) {
        eachArrayValue.classState = true;
      }
      eachArrayValue.image = list.image;
      eachArrayValue.borderColor = this.getRandomColor();
      this.showDataList.push(eachArrayValue);
    }
    console.log(this.showDataList);
  }

  goCurrency(index) {
    this.navCtrl.push('CurrencyPage');
  }

}
