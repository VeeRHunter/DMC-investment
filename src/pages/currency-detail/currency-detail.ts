import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public showChartData = {
    "lineChartData": [], "lineChartColors": [], "lineChartType": "line", "lineChartOptions": {},
    "lineChartLabels": []
  };
  public axisX_list: any[];
  public monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dayInManth: any;

  public currentCurrency: any;
  public disCurrency: any;
  public disPercent: any;
  public disState: any;

  public latestDate: any;
  public latestTimestamp: any;

  public dailyMode = true;
  public monthlyMode = true;
  public yearMode = true;
  public lineChartOptions: any = {
    responsive: true,
    elements: {
      point: {
        radius: 1,
        hitRadius: 2,
        hoverRadius: 2,
        hoverBorderWidth: 1
      }
    },
    lineOnHover: {
      enabled: true,
      lineColor: '#bbb',
      lineWidth: 1
    },
    legend: { display: false },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EachChartPage');
    if (this.navParams.data.navParams !== null || typeof (this.navParams.data.navParams) !== "undefined") {
      this.chatData = this.navParams.data.navParams;
      this.latestDate = new Date(parseInt(this.chatData.charData[this.chatData.charData.length - 1].date) * 1000);
      this.latestTimestamp = parseInt(this.chatData.charData[this.chatData.charData.length - 1].date);
    }
    this.dailyClick();
  }

  dailyClick() {
    this.setAllFlages();
    this.axisX_list = new Array();
    for (let i = 0; i < 24; i++) {
      this.axisX_list.push(i);
    }
    this.dailyMode = true;

    this.axisX_list = new Array();
    let currentHour = this.latestDate.getHours();

    for (let i = currentHour + 1; i < 24; i++) {
      this.axisX_list.push(i);
    }

    for (let i = 0; i < currentHour + 1; i++) {
      this.axisX_list.push(i);
    }

    let dataPoints = [];
    // this.showChartData.lineChartLabels = new Array();
    this.showChartData.lineChartLabels.length = 0;
    this.showChartData.lineChartData = new Array();
    for (let eachChart of this.chatData.charData) {
      if ((this.latestTimestamp - parseInt(eachChart.date)) < 23 * 60 * 60) {
        dataPoints.push(eachChart.value);
        this.showChartData.lineChartLabels.push(this.convertTimeToDate(parseInt(eachChart.date)));
      }
    }
    let chartData = { data: dataPoints, label: this.chatData.bigTitle, fill: false, lineTension: 0 };
    this.showChartData.lineChartData.push(chartData);
    this.showChartData.lineChartColors = this.chatData.lineChartColors;
    this.showChartData.lineChartType = this.chatData.lineChartType;
    this.showChartData.lineChartOptions = this.lineChartOptions;

    this.currentCurrency = dataPoints[dataPoints.length - 1];
    this.disCurrency = this.changeToDecimal(dataPoints[dataPoints.length - 1] - dataPoints[0]);
    this.disPercent = this.changeToDecimal((this.disCurrency / this.currentCurrency) * 100) + "%";
    if (this.disCurrency > 0) {
      this.disCurrency = "+$" + this.disCurrency;
      this.disPercent = "+" + this.disPercent;
      this.disState = false;
    } else if (this.disCurrency < 0) {
      this.disCurrency = "-$" + this.disCurrency;
      this.disPercent = "-" + this.disPercent;
      this.disState = true;
    } else {
      this.disCurrency = "$" + this.disCurrency;
      this.disPercent = this.disPercent;
      this.disState = false;
    }
  }

  monthlyClick() {
    this.setAllFlages();
    this.axisX_list = new Array();
    for (let i = 0; i < 32; i++) {
      this.axisX_list.push(i);
    }
    this.monthlyMode = true;

    this.axisX_list = new Array();
    let currentDate = this.latestDate.getDate();
    let previousDates = this.getDaysInMonth(this.latestDate.getMonth(), this.latestDate.getFullYear());

    for (let i = currentDate + 1; i <= previousDates; i++) {
      this.axisX_list.push(i);
    }

    for (let i = 1; i <= currentDate; i++) {
      this.axisX_list.push(i);
    }

    this.dayInManth = this.axisX_list.length;

    let dataPoints = [];
    this.showChartData.lineChartLabels.length = 0;
    this.showChartData.lineChartData = new Array();
    for (let eachChart of this.chatData.charData) {
      if ((this.latestTimestamp - parseInt(eachChart.date)) <= 24 * 60 * 60 * 31) {
        dataPoints.push(eachChart.value);
        this.showChartData.lineChartLabels.push(this.convertTimeToDate(parseInt(eachChart.date)));
      }
    }
    let chartData = { data: dataPoints, label: this.chatData.bigTitle, fill: false, lineTension: 0 };
    this.showChartData.lineChartData.push(chartData);
    this.showChartData.lineChartColors = this.chatData.lineChartColors;
    this.showChartData.lineChartType = this.chatData.lineChartType;
    this.showChartData.lineChartOptions = this.chatData.lineChartOptions;

    this.currentCurrency = dataPoints[dataPoints.length - 1];
    this.disCurrency = this.changeToDecimal(dataPoints[dataPoints.length - 1] - dataPoints[0]);
    this.disPercent = this.changeToDecimal((this.disCurrency / this.currentCurrency) * 100) + "%";
    if (this.disCurrency > 0) {
      this.disCurrency = "+$" + this.disCurrency;
      this.disPercent = "+" + this.disPercent;
      this.disState = false;
    } else if (this.disCurrency < 0) {
      this.disCurrency = "-$" + this.disCurrency;
      this.disPercent = "-" + this.disPercent;
      this.disState = true;
    } else {
      this.disCurrency = "$" + this.disCurrency;
      this.disPercent = this.disPercent;
      this.disState = false;
    }
  }

  yearlyClick() {
    this.setAllFlages();
    this.axisX_list = this.monthsList;
    this.yearMode = true;

    let dataPoints = [];
    // this.showChartData.lineChartLabels = new Array();

    this.axisX_list = new Array();
    let currentMonth = this.latestDate.getMonth();

    for (let i = currentMonth + 1; i < 12; i++) {
      this.axisX_list.push(this.monthsList[i]);
    }

    for (let i = 0; i <= currentMonth; i++) {
      this.axisX_list.push(this.monthsList[i]);
    }

    this.showChartData.lineChartLabels.length = 0;
    // this.showChartData.lineChartLabels = new Array();
    this.showChartData.lineChartData = new Array();
    for (let eachChart of this.chatData.charData) {
      if ((this.latestTimestamp - parseInt(eachChart.date)) <= 24 * 60 * 60 * this.days_of_a_year(this.latestDate.getFullYear())) {
        dataPoints.push(eachChart.value);
        this.showChartData.lineChartLabels.push(this.convertTimeToDate(parseInt(eachChart.date)));
      }
    }
    let chartData = { data: dataPoints, label: this.chatData.bigTitle, fill: false, lineTension: 0 };
    this.showChartData.lineChartData.push(chartData);
    this.showChartData.lineChartColors = this.chatData.lineChartColors;
    this.showChartData.lineChartType = this.chatData.lineChartType;
    this.showChartData.lineChartOptions = this.chatData.lineChartOptions;

    this.currentCurrency = dataPoints[dataPoints.length - 1];
    this.disCurrency = this.changeToDecimal(dataPoints[dataPoints.length - 1] - dataPoints[0]);
    this.disPercent = this.changeToDecimal((this.disCurrency / this.currentCurrency) * 100) + "%";
    if (this.disCurrency > 0) {
      this.disCurrency = "+$" + this.disCurrency;
      this.disPercent = "+" + this.disPercent;
      this.disState = false;
    } else if (this.disCurrency < 0) {
      this.disCurrency = "-$" + this.disCurrency;
      this.disPercent = "-" + this.disPercent;
      this.disState = true;
    } else {
      this.disCurrency = "$" + this.disCurrency;
      this.disPercent = this.disPercent;
      this.disState = false;
    }
  }

  convertTimeToDate(unix_timestamp) {
    let dateValue = new Date(unix_timestamp * 1000);
    let year = dateValue.getFullYear();
    // let month = months[dateValue.getMonth()];
    let month = dateValue.getMonth() + 1;
    let date = dateValue.getDate();
    // Hours part from the timestamp
    let hours = dateValue.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + dateValue.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + dateValue.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = year + ":" + month + ":" + date + "T" + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  days_of_a_year(year) {

    return this.isLeapYear(year) ? 366 : 365;
  }

  isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }



  setAllFlages() {
    this.dailyMode = false;
    this.monthlyMode = false;
    this.yearMode = false;
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
