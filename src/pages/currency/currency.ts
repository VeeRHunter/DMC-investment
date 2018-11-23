import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

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


  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log(this.lineChartData);

    for (let list of this.totalDataArray) {
      let listTemp = {
        "bigTitle": "", "smallTitle": "", "totalValue": "", "changeValue": "", "chanagePercent": ""
        , "lineChartData": [], "lineChartColors": [], "lineChartType": "line", "lineChartOptions": this.lineChartOptions,
        "lineChartLabels": [], "classState": false,
      };
      listTemp.bigTitle = list.bigTitle;
      listTemp.smallTitle = list.smallTitle;
      listTemp.totalValue = list.totalValue;
      listTemp.changeValue = list.changeValue;
      if (listTemp.changeValue.includes("-")) {
        listTemp.classState = true;
      }
      listTemp.chanagePercent = list.chanagePercent;
      let currentColor = this.getRandomColor();
      let tempColors =
      { // grey
        backgroundColor: 'transparent',
        borderColor: currentColor,
        pointBackgroundColor: currentColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(' + currentColor + ", 0.8)"
      };
      listTemp.lineChartColors.push(tempColors);
      let dataPoints = [];
      let y = 0;
      for (let i = 0; i < 150; i++) {
        y += Math.round(5 + Math.random() * (-5 - 5));
        dataPoints.push({ y: y });
        listTemp.lineChartLabels.push(i + "text");
      }
      let chartData = { data: dataPoints, label: list.bigTitle, fill: false, lineTension: 0 };
      listTemp.lineChartData.push(chartData);

      this.showTotalData.push(listTemp);
    }

    console.log(this.showTotalData);
    this.enableShow = true;
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

}
