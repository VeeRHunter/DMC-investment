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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    // this.orgInvestment = 3000000;
    // this.dailyYield = 82.19178990;
    // this.realLiveFeed = this.orgInvestment + this.dailyYield;
    // this.liveFeed = this.changeToDecimal(this.orgInvestment + this.dailyYield);
    // // console.log(this.orgInvestment.toFixed(2));
    // this.calculateLiveFeed();
    this.getLiveData();
  }

  getLiveData() {
    console.log("aslhdfkjahlsdjkf");
    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      // console.log(result);
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
    this.navCtrl.push('RealEastatePage');
  }

  gotoTransaction() {
    localStorage.setItem("originalInvestment", this.orgInvestment);
    this.navCtrl.push('TransactionPage');
  }

}
