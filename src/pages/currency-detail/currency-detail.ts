import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the CurrencyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currency-detail',
  templateUrl: 'currency-detail.html',
})
export class CurrencyDetailPage {

  public chatData: any;
  public axisX_list = [];
  public monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public hourList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public hourMode = true;
  public dailyMode = true;
  public weeklyMode = true;
  public monthlyMode = true;
  public yearMode = true;
  public allMode = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EachChartPage');
    if (this.navParams.data.navParams !== null || typeof (this.navParams.data.navParams) !== "undefined") {
      this.chatData = this.navParams.data.navParams;
      // this.chatData.lineChartOptions.elements.point.radius = 1;
      // console.log(this.chatData.lineChartOptions.elements.point.radius);
    }
    this.yearlyClick();
  }

  hourlyClick() {
    this.setAllFlages();
    this.hourMode = true;
  }

  dailyClick() {
    this.setAllFlages();
    this.dailyMode = true;
  }

  monthlyClick() {
    this.setAllFlages();
    this.monthlyMode = true;
  }

  weeklyClick() {
    this.setAllFlages();
    this.weeklyMode = true;
  }

  yearlyClick() {
    this.setAllFlages();
    this.axisX_list = this.monthsList;
    this.yearMode = true;
  }

  allClick() {
    this.setAllFlages();
    this.allMode = true;
  }


  setAllFlages() {
    this.hourMode = false;
    this.dailyMode = false;
    this.weeklyMode = false;
    this.monthlyMode = false;
    this.yearMode = false;
    this.allMode = false;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  back() {
    this.navCtrl.pop();
  }

}
