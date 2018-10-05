import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the EascrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eascrow',
  templateUrl: 'eascrow.html',
})
export class EascrowPage {

  public userData = { "email": "", "apiState": "getEscrow" };
  public controllerData: any;
  public escrowList: any[];

  public enableCreate: boolean;
  public enablePending = false;
  public enableComplete = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EascrowPage');
    this.getDataList();
  }

  getDataList() {
    this.escrowList = new Array();
    this.userData.email = localStorage.getItem("useremail");
    let loading = this.loadingCtrl.create({
      content: "Pleasle Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      console.log(result);
      if (Object(result).status == "success") {
        this.controllerData = Object(result).contollerList[0];
        if (this.controllerData.controller_access > 0) {
          localStorage.setItem("controllerID", this.controllerData.id);
          this.enableCreate = true;
        } else {
          this.enableCreate = false;
        }
        for (let list of Object(result).escrowList) {
          if (list.transaction_completed == "1") {
            this.enableComplete = true;
          }
          if (list.transaction_completed == "0") {
            this.enablePending = true;
          }
          this.escrowList.push(list);
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

  createTransaction() {
    this.navCtrl.setRoot('EscrowCreatePage');
  }

  pendingTransactions() {
    this.navCtrl.setRoot('EscrowPendingPage');
  }

  completeTransactions() {
    this.navCtrl.setRoot('EscrowCompletePage');
  }

}
