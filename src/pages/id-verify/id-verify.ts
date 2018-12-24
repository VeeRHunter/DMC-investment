import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the IdVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-id-verify',
  templateUrl: 'id-verify.html',
})
export class IdVerifyPage {

  public userData = { "email": "", "apiState": "verifyID" };

  public exitRealList: Boolean;
  public realEstateList: any[];

  public pageTitle = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdVerifyPage');
    this.realEstateList = new Array();
    this.exitRealList = false;
    if (localStorage.getItem("verifyType") == "idVerify") {
      this.pageTitle = "Verify your ID at the following locations";
    } else if (localStorage.getItem("verifyType") == "realEstate") {
      this.pageTitle = "Find your local participating real estate agent";
    }
    this.userData.email = localStorage.getItem("useremail");
  }

  searchRealEstate() {
    this.realEstateList = new Array();
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.apiserver.postData(this.userData).then(result => {
      loading.dismiss();
      if (Object(result).status == "success") {
        for (let list of Object(result).realEstateList) {
          this.realEstateList.push(list);
        }
        if (this.realEstateList.length > 0) {
          this.exitRealList = true;
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

  goback() {
    this.navCtrl.pop();
  }

}
