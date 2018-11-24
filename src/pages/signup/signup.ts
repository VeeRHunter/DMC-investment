import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ServerProvider } from '../../providers/server/server';
// import { ApiserverProvider } from '../../providers/apiserver/apiserver';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  public rePasswordControl = new FormControl('', [
    Validators.required
  ]);

  public pinControl = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]{4}$")
  ])
  public rePinControl = new FormControl('', [
    Validators.required
  ]);

  // public uniqueCtrl = new FormControl('', [
  //   Validators.required,
  // ]);

  public uniqueLength: any;

  public userData = { "firstName": "", "lastName": "", "email": "", "DOB": "", "address": "", "city": "", "state": "", "country": "", "postalCode": "", "uniqueField": "000000000", "password": "", "repassword": "", "pincode": "", "repincode": "", "apiState": "signup" };

  public countryList: any[];
  public totalList: any[];
  public uniqueList = ["unique1", "unique2"];

  public clickSignUp = false;

  public switchUnique = true;
  public uniquePlace: any;
  public uniqueType: any;

  public yearList: any[];
  public currentYear: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    // this.uniquePlace = "Unique Field";
    this.yearList = new Array();
    this.currentYear = parseInt(new Date().toLocaleDateString().split("/")[2]);
    for (let i = 1950; i < this.currentYear + 1; i++) {
      this.yearList.push(i);
    }
    this.getCountryList();
  }

  getCountryList() {
    this.countryList = new Array();
    this.totalList = new Array();
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.userData.apiState = "getCountryList";
    this.apiserver.postData(this.userData).then(result => {
      console.log(result);
      loading.dismiss();
      if (Object(result).status == "success") {
        let tempCountry = new Array();
        for (let list of Object(result).countryList) {
          tempCountry.push(list.uc_country);
          this.totalList.push(list);
        }
        for (let list of tempCountry.sort()) {
          this.countryList.push(list);
        }
        console.log(this.countryList);
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

  signUpUser(userProfile) {
    this.clickSignUp = true;
    console.log(userProfile);
    if (userProfile.valid && this.emailFormControl.valid && this.rePasswordControl.valid
      && this.pinControl.valid && this.rePinControl.valid
      && this.userData.password == this.userData.repassword
      && this.userData.pincode == this.userData.repincode) {
      console.log(JSON.stringify(this.userData));
      console.log(this.userData);
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      this.userData.apiState = "signup";
      this.apiserver.postData(this.userData).then((result) => {
        loading.dismiss();
        console.log(Object(result));
        if (Object(result).status == "success") {
          localStorage.setItem("loged", "login");
          localStorage.setItem("useremail", this.userData.email);
          this.navCtrl.push('WelcomePage');
        } else {
          let toast = this.toastCtrl.create({
            message: Object(result).detail,
            duration: 2000
          })
          toast.present();
        };

      }, (err) => {
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        })
        toast.present();
        loading.dismiss();
      });
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  clickDOB() {
    console.log("asdfasdfasdf");
    window.scrollTo(0, 0);
  }

  selectCountry() {
    // if (this.userData.country == "") {
    //   this.uniquePlace = "Unique Field";
    // } else {
    //   for (let list of this.totalList) {
    //     if (this.userData.country == list.uc_country) {
    //       this.uniquePlace = list.uc_field_name;
    //       this.uniqueLength = list.uc_characters;
    //       if (list.uc_letters == "0") {
    //         this.uniqueType = "number";

    //         this.uniqueCtrl.setValidators(
    //           Validators.pattern("[0-9]{" + list.uc_characters + "}$")
    //         );
    //       } else {
    //         this.uniqueType = "text";

    //         this.uniqueCtrl.setValidators(
    //           Validators.pattern("[A-Za-z0-9]{" + list.uc_characters + "}$")
    //         );
    //       }

    //     }
    //   }
    // }
  }

}
