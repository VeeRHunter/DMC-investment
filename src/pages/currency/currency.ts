import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CurrencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage {

  public chartParam: any;
  public invesParam: any;

  public totalInvest: any;
  public disInvest: any;
  public disPercent: any;

  public lineChartData: Array<any> = [

  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    elements: {
      point: {
        radius: 0
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
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public totalDataArray = [
    {
      "bigTitle": "Bitcoin", "smallTitle": "BTC",
      "totalValue": "US$16648.62", "changeValue": "-$822.62",
      "chanagePercent": "7.22%"
    },
    { "bigTitle": "Bitcoin Cash", "smallTitle": "BCH", "totalValue": "US$824.46", "changeValue": "$64.42", "chanagePercent": "2.8%" },
    { "bigTitle": "Ethereum", "smallTitle": "ETH", "totalValue": "US$482.24", "changeValue": "-$46.68", "chanagePercent": "27.6%" }
  ];
  public showTotalData = new Array();
  public lineChartType: string = 'line';

  public enableShow = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

  }

  ionViewDidLoad() {
    this.enableShow = true;

    this.chartParam = this.navParams.data.chartData;
    this.invesParam = this.navParams.data.investmentValue;
    console.log(this.chartParam);
    this.totalInvest = this.invesParam.investmentValue;
    this.disInvest = this.invesParam.disValue;
    this.disPercent = this.invesParam.disPercent;

    console.log(this.invesParam);

    this.getChartData();
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

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  gotoDetail(index) {
    console.log(this.showTotalData[index]);
    this.navCtrl.push('CurrencyDetailPage', { navParams: this.showTotalData[index] });
  }

  getChartData() {
    for (let list of this.chartParam) {
      let listTemp = {
        "bigTitle": "", "smallTitle": "", "totalValue": "", "changeValue": "", "chanagePercent": ""
        , "lineChartData": [], "lineChartColors": [], "lineChartType": "line", "lineChartOptions": this.lineChartOptions,
        "lineChartLabels": [], "classState": false, "charData": list.chartData,
      };

      listTemp.bigTitle = list.bigTitle;
      listTemp.smallTitle = list.smallTitle;
      listTemp.totalValue = list.currentCurrency;
      listTemp.changeValue = list.dailyDis;
      listTemp.chanagePercent = list.dailyPercent;
      if (listTemp.changeValue.includes("-")) {
        listTemp.classState = true;
      }

      let tempColors =
      { // grey
        backgroundColor: 'transparent',
        borderColor: list.borderColor,
        pointBackgroundColor: list.borderColor,
        pointBorderColor: list.borderColor,
        pointHoverBackgroundColor: list.borderColor,
        pointHoverBorderColor: 'rgba(' + list.borderColor + ", 0.8)"
      };
      listTemp.lineChartColors.push(tempColors);

      let dataPoints = [];
      for (let eachChart of list.chartData) {
        dataPoints.push(eachChart.value);
        listTemp.lineChartLabels.push(this.convertTimeToDate(parseInt(eachChart.date)));
        // this.convertTimeToDate(parseInt(eachChart.date));
      }
      let chartData = { data: dataPoints, label: list.bigTitle, fill: false, lineTension: 0 };
      listTemp.lineChartData.push(chartData);

      this.showTotalData.push(listTemp);

    }
  }

  convertTimeToDate(unix_timestamp) {
    let dateValue = new Date(unix_timestamp * 1000);
    let year = dateValue.getFullYear();
    // let month = months[dateValue.getMonth()];
    let month = dateValue.getMonth();
    let date = dateValue.getDate();
    // Hours part from the timestamp
    let hours = dateValue.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + dateValue.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + dateValue.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = year + ":" + month + ":" + date + "T" + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log(formattedTime);
    return formattedTime;
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
