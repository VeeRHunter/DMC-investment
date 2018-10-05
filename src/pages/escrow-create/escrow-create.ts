import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the EscrowCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escrow-create',
  templateUrl: 'escrow-create.html',
})
export class EscrowCreatePage {

  public flagPropertyAddress: boolean;
  public flagPropertySalePrice: boolean;
  public flagSellerDetails: boolean;
  public flagBuyerDetails: boolean;
  public flagDisbursements: boolean;

  public proAddress1: any;
  public proAddress2 = "";
  public proCity: any;
  public proState: any;
  public proCounty: any;
  public proPost: any;
  public proCheck = false;
  public proIDList: any[];

  public proSalePrice: any;
  public proSaleCheck = false;

  public selFirstName: any;
  public selLastName: any;
  public selEmail: any;
  public selDob: any;
  public selAddress: any;
  public selCity: any;
  public selState: any;
  public selCountry: any;
  public selPostal: any;
  public selUnique: any;
  public selVerify: any;
  public selSearchFlag = true;
  public selShowFlag = true;
  public selCheck = false;
  public sellData: any;
  public addSellButton = "Add Seller";
  public selCountryList: any[];
  public selUniqueType: any;
  public selUniquePlace: any;
  public selUniqueLength: any;
  public selUniqueCtrl = new FormControl('', [
    Validators.required,
  ]);

  public buyFirstName: any;
  public buyLastName: any;
  public buyEmail: any;
  public buyDob: any;
  public buyAddress: any;
  public buyCity: any;
  public buyState: any;
  public buyCountry: any;
  public buyPostal: any;
  public buyUnique: any;
  public buyVerify: any;
  public buySearchFlag = true;
  public buyShowFlag = true;
  public buyCheck = false;
  public buyData: any;
  public addBuyButton = "Add Buyer";
  public buyCountryList: any[];
  public buyUniqueType: any;
  public buyUniquePlace: any;
  public buyUniqueLength: any;
  public buyUniqueCtrl = new FormControl('', [
    Validators.required,
  ]);

  public disFirstName: any;
  public disLastName: any;
  public disEmail: any;
  public disDob: any;
  public disAddress: any;
  public disCity: any;
  public disState: any;
  public disCountry: any;
  public disPostal: any;
  public disUnique: any;
  public disValue: any;
  public disDes: any;
  public disVerify: any;
  public disSearchFlag = true;
  public disShowFlag = true;
  public disCheck = false;
  public disData: any;
  public addDisButton = "Add Disbursement";
  public disCountryList: any[];
  public disUniqueType: any;
  public disUniquePlace: any;
  public disUniqueLength: any;
  public disUniqueCtrl = new FormControl('', [
    Validators.required,
  ]);

  public userEmail: any;

  public totalList: any[];

  public emailCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$")
  ]);


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public apiserver: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscrowCreatePage');
    this.userEmail = localStorage.getItem("useremail");
    this.proIDList = new Array();
    this.proSalePrice = (0).toFixed(2);
    this.disValue = (0).toFixed(2);
    this.setAllFlagToFlase();
    this.getCountryList();
  }


  getCountryList() {
    let userData = { "firstName": "", "lastName": "", "email": "", "DOB": "", "address": "", "city": "", "state": "", "country": "", "postalCode": "", "uniqueField": "", "password": "", "repassword": "", "pincode": "", "repincode": "", "apiState": "signup" };

    this.totalList = new Array();
    this.selCountryList = new Array();
    this.buyCountryList = new Array();
    this.disCountryList = new Array();
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    userData.apiState = "getCountryList";
    this.apiserver.postData(userData).then(result => {
      console.log(result);
      loading.dismiss();
      if (Object(result).status == "success") {
        let tempCountry = new Array();
        for (let list of Object(result).countryList) {
          tempCountry.push(list.uc_country);
          this.totalList.push(list);
        }
        for (let list of tempCountry.sort()) {
          this.selCountryList.push(list);
          this.buyCountryList.push(list);
          this.disCountryList.push(list);
        }
        this.selUniquePlace = "Unique Field";
        this.buyUniquePlace = "Unique Field";
        this.disUniquePlace = "Unique Field";
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

  setAllFlagToFlase() {
    // this.flagBuyerDetails = false;
    // this.flagDisbursements = false;
    // this.flagPropertyAddress = false;
    // this.flagPropertySalePrice = false;
    // this.flagSellerDetails = false;
  }

  propertyAddress() {
    if (this.flagPropertyAddress) {
      this.flagPropertyAddress = !this.flagPropertyAddress;
    } else {
      this.setAllFlagToFlase();
      this.flagPropertyAddress = !this.flagPropertySalePrice;
    }
  }

  propertySalePrice() {
    if (this.flagPropertySalePrice) {
      this.flagPropertySalePrice = !this.flagPropertySalePrice;
    } else {
      this.setAllFlagToFlase();
      this.flagPropertySalePrice = !this.flagPropertySalePrice;
    }
  }

  sellerDetails() {
    if (this.flagSellerDetails) {
      this.flagSellerDetails = !this.flagSellerDetails;
    } else {
      this.setAllFlagToFlase();
      this.flagSellerDetails = !this.flagSellerDetails
    }
  }

  buyerDetails() {
    if (this.flagBuyerDetails) {
      this.flagBuyerDetails = !this.flagBuyerDetails;
    } else {
      this.setAllFlagToFlase();
      this.flagBuyerDetails = true;
    }
  }

  disbursements() {
    if (this.flagDisbursements) {
      this.flagDisbursements = !this.flagDisbursements;
    } else {
      this.setAllFlagToFlase();
      this.flagDisbursements = true;
    }
  }

  addPropertyAddress() {

    console.log(this.getValidProAddress());
    if (!this.getValidProAddress()) {
      let toast = this.toastCtrl.create({
        message: "Please input all field",
        duration: 2000
      });
      toast.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      let addProAddress = { "email": this.userEmail, "apiState": "addProAddress", "proAddress1": this.proAddress1, "proAddress2": this.proAddress2, "proCity": this.proCity, "proState": this.proState, "proPost": this.proPost, "proCountry": this.proCounty, "proTimeStamp": "" };
      addProAddress.proTimeStamp = Math.floor(new Date().getTime() / 1000).toString();
      console.log(addProAddress);

      this.apiserver.postData(addProAddress).then(result => {
        loading.dismiss();
        console.log(result);
        if (Object(result).status == "success") {
          this.proCheck = true;
          this.proIDList.push(Object(result).propertyID);
          localStorage.setItem("propertyID", Object(result).propertyID);
          console.log(this.proIDList);
          this.setAllFlagToFlase();
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
      });
    }

  }

  addProSalePrice() {
    if (!this.getValidProSale()) {
      let toast = this.toastCtrl.create({
        message: "Please input correct price",
        duration: 2000
      });
      toast.present();
    } else {
      let addProAddress = { "email": this.userEmail, "apiState": "addProSale", "propertyID": "", "proTimeStamp": "", "proValue": this.proSalePrice };

      if (this.proIDList.length == 0) {
        let toast = this.toastCtrl.create({
          message: "Please input Property Address First",
          duration: 2000
        });
        toast.present();

        setTimeout(() => {
          this.setAllFlagToFlase();
          this.flagPropertyAddress = true;
        }, 2000);
      } else {
        addProAddress.propertyID = localStorage.getItem("propertyID");
        addProAddress.proTimeStamp = Math.floor(new Date().getTime() / 1000).toString();

        let loading = this.loadingCtrl.create({
          content: "Please Wait..."
        });
        loading.present();


        this.apiserver.postData(addProAddress).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.proSaleCheck = true;
            this.proIDList.push(Object(result).propertyID);
            this.setAllFlagToFlase();
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
        });
      }

    }
  }

  addSeller() {
    if (this.selShowFlag) {
      if (this.proIDList.length == 0) {
        let toast = this.toastCtrl.create({
          message: "Please input property address first",
          duration: 2000
        });
        toast.present();
        this.setAllFlagToFlase();
        this.flagPropertyAddress = true;
      } else {
        let loading = this.loadingCtrl.create({
          content: "Please Wait..."
        });
        loading.present();
        let addSellData = { "email": "", "userID": "", "apiState": "addSell", "propertyID": "", "controllerID": "", "timestamp": "" };
        addSellData.email = this.selEmail;
        addSellData.userID = this.sellData.user_id;
        addSellData.propertyID = localStorage.getItem("propertyID");
        addSellData.controllerID = localStorage.getItem("controllerID");
        addSellData.timestamp = Math.floor(new Date().getTime() / 1000).toString();
        console.log(addSellData);
        this.apiserver.postData(addSellData).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.setAllFlagToFlase();
            this.selCheck = true;
            this.selShowFlag = false;
            this.addSellButton = "Add Another Seller";
            this.clearSeller();
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
    } else {
      if (!this.getValidSeller()) {
        let toast = this.toastCtrl.create({
          message: "Please input data for add seller",
          duration: 2000
        });
        toast.present();
      } else {
        if (this.proIDList.length == 0) {
          let toast = this.toastCtrl.create({
            message: "Please input property address first",
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            this.setAllFlagToFlase();
            this.flagPropertyAddress = true;
          }, 2000);
        } else {
          this.emailCtrl.setValue(this.selEmail);
          if (this.emailCtrl.valid) {
            let addNewSeller = { "firstName": this.selFirstName, "lastName": this.selLastName, "email": this.selEmail, "dob": this.selDob, "address": this.selAddress, "city": this.selCity, "state": this.selState, "country": this.selCountry, "postcode": this.selPostal, "unique": this.selUnique, "apiState": "addNewSeller", "proID": localStorage.getItem("propertyID"), "controllerID": "", "timestamp": "" };
            let loading = this.loadingCtrl.create({
              content: "Please Wait..."
            });
            loading.present();
            addNewSeller.controllerID = localStorage.getItem("controllerID");
            addNewSeller.timestamp = Math.floor(new Date().getTime() / 1000).toString();
            this.apiserver.postData(addNewSeller).then(result => {
              loading.dismiss();
              console.log(result);
              if (Object(result).status == "success") {
                this.selCheck = true;
                this.setAllFlagToFlase();
                this.clearSeller();
                this.addSellButton = "Add Another Seller";
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
            });
          } else {
            let toast = this.toastCtrl.create({
              message: "Please input valid email address",
              duration: 2000
            });
            toast.present();
          }
        }
      }
    }
  }

  addBuyer() {
    if (this.buyShowFlag) {
      if (this.proIDList.length == 0) {
        let toast = this.toastCtrl.create({
          message: "Please input property address first",
          duration: 2000
        });
        toast.present();
        this.setAllFlagToFlase();
        this.flagPropertyAddress = true;
      } else {
        let loading = this.loadingCtrl.create({
          content: "Please Wait..."
        });
        loading.present();
        let addBuyData = { "email": "", "userID": "", "apiState": "addBuy", "propertyID": "", "controllerID": "", "timestamp": "" };
        addBuyData.email = this.buyEmail;
        addBuyData.userID = this.buyData.user_id;
        addBuyData.propertyID = localStorage.getItem("propertyID");
        addBuyData.controllerID = localStorage.getItem("controllerID");
        console.log(addBuyData);
        addBuyData.timestamp = Math.floor(new Date().getTime() / 1000).toString();
        this.apiserver.postData(addBuyData).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.setAllFlagToFlase();
            this.buyCheck = true;
            this.buyShowFlag = false;
            this.addBuyButton = "Add Another Buyer";
            this.clearBuyer();
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
    } else {
      if (!this.getValidBuyer()) {
        let toast = this.toastCtrl.create({
          message: "Please input data for add buyer",
          duration: 2000
        });
        toast.present();
      } else {
        if (this.proIDList.length == 0) {
          let toast = this.toastCtrl.create({
            message: "Please input property address first",
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            this.setAllFlagToFlase();
            this.flagPropertyAddress = true;
          }, 2000);
        } else {
          this.emailCtrl.setValue(this.buyEmail);
          if (this.emailCtrl.valid) {
            let addNewBuyer = { "firstName": this.buyFirstName, "lastName": this.buyLastName, "email": this.buyEmail, "dob": this.buyDob, "address": this.buyAddress, "city": this.buyCity, "state": this.buyState, "country": this.buyCountry, "postcode": this.buyPostal, "unique": this.buyUnique, "apiState": "addNewBuyer", "proID": localStorage.getItem("propertyID"), "controllerID": "", "timestamp": "" };
            let loading = this.loadingCtrl.create({
              content: "Please Wait..."
            });
            loading.present();
            addNewBuyer.controllerID = localStorage.getItem("controllerID");
            addNewBuyer.timestamp = Math.floor(new Date().getTime() / 1000).toString();
            this.apiserver.postData(addNewBuyer).then(result => {
              loading.dismiss();
              console.log(result);
              if (Object(result).status == "success") {
                this.buyCheck = true;
                this.setAllFlagToFlase();
                this.clearBuyer();
                this.addBuyButton = "Add Another Buyer";
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
            });
          } else {
            let toast = this.toastCtrl.create({
              message: "Please input valid email address",
              duration: 2000
            });
            toast.present();
          }
        }
      }
    }
  }

  addDisbursement() {
    if (this.disShowFlag) {
      if (this.proIDList.length == 0) {
        let toast = this.toastCtrl.create({
          message: "Please input property address first",
          duration: 2000
        });
        toast.present();
        this.setAllFlagToFlase();
        this.flagPropertyAddress = true;
      } else {
        let loading = this.loadingCtrl.create({
          content: "Please Wait..."
        });
        loading.present();
        let addDisData = { "email": "", "userID": "", "apiState": "addDis", "propertyID": "", "controllerID": "", "timestamp": "", "disValue": this.disValue, "disDes": this.disDes };
        addDisData.email = this.disEmail;
        addDisData.userID = this.disData.user_id;
        addDisData.propertyID = localStorage.getItem("propertyID");
        addDisData.controllerID = localStorage.getItem("controllerID");
        addDisData.timestamp = Math.floor(new Date().getTime() / 1000).toString();
        console.log(addDisData);
        this.apiserver.postData(addDisData).then(result => {
          loading.dismiss();
          console.log(result);
          if (Object(result).status == "success") {
            this.setAllFlagToFlase();
            this.disCheck = true;
            this.disShowFlag = false;
            this.addDisButton = "Add Another Disbursement";
            this.clearDis();
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
    } else {
      if (!this.getValidDis()) {
        let toast = this.toastCtrl.create({
          message: "Please input data for add disbursement",
          duration: 2000
        });
        toast.present();
      } else {
        if (this.proIDList.length == 0) {
          let toast = this.toastCtrl.create({
            message: "Please input property address first",
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            this.setAllFlagToFlase();
            this.flagPropertyAddress = true;
          }, 2000);
        } else {
          this.emailCtrl.setValue(this.disEmail);
          if (this.emailCtrl.valid) {
            let addNewDis = { "firstName": this.disFirstName, "lastName": this.disLastName, "email": this.disEmail, "dob": this.disDob, "address": this.disAddress, "city": this.disCity, "state": this.disState, "country": this.disCountry, "postcode": this.disPostal, "unique": this.disUnique, "apiState": "addNewDis", "proID": localStorage.getItem("propertyID"), "controllerID": "", "timestamp": "", "disValue": this.disValue, "disDes": this.disDes };
            let loading = this.loadingCtrl.create({
              content: "Please Wait..."
            });
            loading.present();
            addNewDis.controllerID = localStorage.getItem("controllerID");
            addNewDis.timestamp = Math.floor(new Date().getTime() / 1000).toString();
            this.apiserver.postData(addNewDis).then(result => {
              loading.dismiss();
              console.log(result);
              if (Object(result).status == "success") {
                this.disCheck = true;
                this.setAllFlagToFlase();
                this.clearDis();
                this.addDisButton = "Add Another Disbursement";
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
            });
          } else {
            let toast = this.toastCtrl.create({
              message: "Please input valid email address",
              duration: 2000
            });
            toast.present();
          }
        }
      }
    }
  }

  sellEmailSearch() {
    // this.selSearchFlag = false;
    // this.selShowFlag = false;
    // if(this.selEmail)
    this.emailCtrl.setValue(this.selEmail);
    if (!this.emailCtrl.valid) {
      let toast = this.toastCtrl.create({
        message: "Please input valid email address",
        duration: 2000
      });
      toast.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      let searchSaleEmail = { "email": this.selEmail, "apiState": "searchSaleEmail" };
      this.apiserver.postData(searchSaleEmail).then(result => {
        loading.dismiss();
        console.log(result);
        if (Object(result).status == "success") {
          this.selShowFlag = true;
          this.selSearchFlag = false;
          this.sellData = Object(result).userData;
          this.selFirstName = Object(result).userData.user_fname;
          this.selLastName = Object(result).userData.user_lname;
          this.selEmail = Object(result).userData.user_email;
          if (Object(result).userData.user_verified == "1") {
            this.selVerify = "Yes";
          } else {
            this.selVerify = "No";
          }
          this.selAddress = Object(result).userData.user_address;
          this.selCity = Object(result).userData.user_city;
          this.selCountry = Object(result).userData.user_country;
          this.selPostal = Object(result).userData.user_postcode;
          this.selState = Object(result).userData.user_state;

        } else {
          // let toast = this.toastCtrl.create({
          //   message: Object(result).detail,
          //   duration: 2000
          // });
          // toast.present();
          this.selShowFlag = false;
          this.selSearchFlag = false;
          this.selEmail = "";
        }
      }, error => {
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        });
        toast.present();
      })
    }
  }

  buyEmailSearch() {
    this.emailCtrl.setValue(this.buyEmail);
    if (!this.emailCtrl.valid) {
      let toast = this.toastCtrl.create({
        message: "Please input valid email address",
        duration: 2000
      });
      toast.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      let searchSaleEmail = { "email": this.buyEmail, "apiState": "searchBuyEmail" };
      this.apiserver.postData(searchSaleEmail).then(result => {
        loading.dismiss();
        console.log(result);
        if (Object(result).status == "success") {
          this.buyShowFlag = true;
          this.buySearchFlag = false;
          this.buyData = Object(result).userData;
          this.buyFirstName = Object(result).userData.user_fname;
          this.buyLastName = Object(result).userData.user_lname;
          this.buyEmail = Object(result).userData.user_email;
          if (Object(result).userData.user_verified == "1") {
            this.buyVerify = "Yes";
          } else {
            this.buyVerify = "No";
          }
          this.buyAddress = Object(result).userData.user_address;
          this.buyCity = Object(result).userData.user_city;
          this.buyCountry = Object(result).userData.user_country;
          this.buyPostal = Object(result).userData.user_postcode;
          this.buyState = Object(result).userData.user_state;

        } else {
          // let toast = this.toastCtrl.create({
          //   message: Object(result).detail,
          //   duration: 2000
          // });
          // toast.present();
          this.buyShowFlag = false;
          this.buySearchFlag = false;
          this.buyEmail = "";
        }
      }, error => {
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        });
        toast.present();
      })
    }
  }

  disEmailSearch() {
    this.emailCtrl.setValue(this.disEmail);
    if (!this.emailCtrl.valid) {
      let toast = this.toastCtrl.create({
        message: "Please input valid email address",
        duration: 2000
      });
      toast.present();
    } else {
      let loading = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loading.present();
      let searchSaleEmail = { "email": this.disEmail, "apiState": "searchDisEmail" };
      this.apiserver.postData(searchSaleEmail).then(result => {
        loading.dismiss();
        console.log(result);
        if (Object(result).status == "success") {
          this.disShowFlag = true;
          this.disSearchFlag = false;
          this.disData = Object(result).userData;
          this.disFirstName = Object(result).userData.user_fname;
          this.disLastName = Object(result).userData.user_lname;
          this.disEmail = Object(result).userData.user_email;
          if (Object(result).userData.user_verified == "1") {
            this.disVerify = "Yes";
          } else {
            this.disVerify = "No";
          }
          this.disAddress = Object(result).userData.user_address;
          this.disCity = Object(result).userData.user_city;
          this.disCountry = Object(result).userData.user_country;
          this.disPostal = Object(result).userData.user_postcode;
          this.disState = Object(result).userData.user_state;

        } else {
          // let toast = this.toastCtrl.create({
          //   message: Object(result).detail,
          //   duration: 2000
          // });
          // toast.present();
          this.disShowFlag = false;
          this.disSearchFlag = false;
          this.disEmail = "";
        }
      }, error => {
        let toast = this.toastCtrl.create({
          message: "No Network",
          duration: 2000
        });
        toast.present();
      })
    }
  }

  clearSeller() {
    this.selAddress = "";
    this.selCity = "";
    this.selCountry = "";
    this.selDob = "";
    this.selEmail = "";
    this.selFirstName = "";
    this.selLastName = "";
    this.selState = "";
    this.selPostal = "";
    this.selUnique = "";
  }

  clearBuyer() {
    this.buyAddress = "";
    this.buyCity = "";
    this.buyCountry = "";
    this.buyDob = "";
    this.buyEmail = "";
    this.buyFirstName = "";
    this.buyLastName = "";
    this.buyState = "";
    this.buyPostal = "";
    this.buyUnique = "";
  }

  clearDis() {
    this.disAddress = "";
    this.disCity = "";
    this.disCountry = "";
    this.disDob = "";
    this.disEmail = "";
    this.disFirstName = "";
    this.disLastName = "";
    this.disState = "";
    this.disPostal = "";
    this.disUnique = "";
    this.disValue = (0).toFixed(2);
    this.disDes = "";
  }















  focusOnProSalePrice() {

  }

  focusOutProSalePrice() {
    if (this.proSalePrice > 0) {
      this.proSalePrice = this.proSalePrice.toFixed(2);
    } else {
      this.proSalePrice = (0).toFixed(2);
    }
  }

  focusOnDisbursement() {

  }

  focusOutDisbursement() {
    if (this.disValue > 0) {
      this.disValue = this.disValue.toFixed(2);
    } else {
      this.disValue = (0).toFixed(2);
    }
  }

  getAvailItem(inputData) {
    if (inputData == "" || typeof (inputData) == "undefined") {
      return false;
    } else {
      return true;
    }
  }

  getValidProAddress() {
    if (this.getAvailItem(this.proAddress1) && this.getAvailItem(this.proCity) && this.getAvailItem(this.proCounty) && this.getAvailItem(this.proState) && this.getAvailItem(this.proPost)) {
      return true;
    } else {
      return false;
    }
  }

  getValidProSale() {
    if (this.proSalePrice > 0) {
      return true;
    } else {
      return false;
    }
  }

  getValidSeller() {
    if (this.selSearchFlag) {
      return false;
    } else {
      if (this.selShowFlag) {
        return true;
      } else {
        if (this.getAvailItem(this.selFirstName) && this.getAvailItem(this.selAddress) && this.getAvailItem(this.selCity) && this.getAvailItem(this.selCountry) && this.getAvailItem(this.selDob) && this.getAvailItem(this.selEmail) && this.getAvailItem(this.selLastName) && this.getAvailItem(this.selPostal) && this.selUniqueCtrl.valid && this.getAvailItem(this.selState)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  getValidBuyer() {
    if (this.buySearchFlag) {
      return false;
    } else {
      if (this.buyShowFlag) {
        return true;
      } else {
        if (this.getAvailItem(this.buyAddress) && this.getAvailItem(this.buyCity) && this.getAvailItem(this.buyCountry) && this.getAvailItem(this.buyDob) && this.getAvailItem(this.buyEmail) && this.getAvailItem(this.buyFirstName) && this.getAvailItem(this.buyLastName) && this.getAvailItem(this.buyPostal) && this.buyUniqueCtrl.valid && this.getAvailItem(this.buyState)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  getValidDis() {
    if (this.disSearchFlag) {
      return false;
    } else {
      if (this.disShowFlag && this.disValue > 0 && this.getAvailItem(this.disDes)) {
        return true;
      } else {
        if (this.getAvailItem(this.disAddress) && this.getAvailItem(this.disCity) && this.getAvailItem(this.disCountry) && this.getAvailItem(this.disDes) && this.getAvailItem(this.disDob) && this.getAvailItem(this.disEmail) && this.getAvailItem(this.disFirstName) && this.getAvailItem(this.disLastName) && this.getAvailItem(this.disPostal) && this.getAvailItem(this.disState) && this.disUniqueCtrl.valid && this.disValue > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  startTransaction() {
    if (this.buyCheck && this.selCheck && this.proCheck && this.disCheck && this.proSaleCheck) {
      let loading = this.loadingCtrl.create({
        content: "No Network"
      });
      loading.present();

      let addTranData = { "userID": "", "apiState": "addTransaction", "propertyID": "", "controllerID": "", "timestamp": "" };
      addTranData.propertyID = localStorage.getItem("propertyID");
      addTranData.controllerID = localStorage.getItem("controllerID");
      addTranData.timestamp = Math.floor(new Date().getTime() / 1000).toString();

      this.apiserver.postData(addTranData).then(result => {
        loading.dismiss();
        if (Object(result).status == "success") {
          this.navCtrl.push('EascrowPage');
        }
      })
    } else {
      if (!this.proCheck) {
        this.flagPropertyAddress = true;
      }

      if (!this.proSaleCheck) {
        this.flagPropertySalePrice = true;
      }

      if (!this.selCheck) {
        this.flagSellerDetails = true;
        // if (!this.selSearchFlag) {
        //   this.selShowFlag = true;
        // } else {
        //   this.selSearchFlag = false;
        // }
      }

      if (!this.buyCheck) {
        this.flagBuyerDetails = true;
        // this.buyShowFlag = true;
        // this.buySearchFlag = false;
      }

      if (!this.disCheck) {
        this.flagDisbursements = true;
        // this.disShowFlag = true;
        // this.disSearchFlag = false;
      }
    }
  }

  selectCountry() {
    // if (this.selCountry == "United State") {
    //   this.uniquPlace = "Social Security Number";
    // }
    // else if (this.selCountry == "Australia") {
    //   this.uniquPlace = "Tax File Number";
    // }
    // else {
    //   this.uniquPlace = "Unique Field";
    // }
    if (this.selCountry == "") {
      this.selUniquePlace = "Unique Field";
    } else {
      for (let list of this.totalList) {
        if (this.selCountry == list.uc_country) {
          this.selUniquePlace = list.uc_field_name;
          this.selUniqueLength = list.uc_characters;
          if (list.uc_letters == "0") {
            this.selUniqueType = "number";

            this.selUniqueCtrl.setValidators(
              Validators.pattern("[0-9]{" + list.uc_characters + "}$")
            );
          } else {
            this.selUniqueType = "text";

            this.selUniqueCtrl.setValidators(
              Validators.pattern("[A-Za-z0-9]{" + list.uc_characters + "}$")
            );
          }

        }
      }
    }
  }


  selectBuyCountry() {
    // if (this.buyCountry == "United State") {
    //   this.uniquBuyPlace = "Social Security Number";
    // }
    // else if (this.buyCountry == "Australia") {
    //   this.uniquBuyPlace = "Tax File Number";
    // }
    // else {
    //   this.uniquBuyPlace = "Unique Field";
    // }
    if (this.buyCountry == "") {
      this.buyUniquePlace = "Unique Field";
    } else {
      for (let list of this.totalList) {
        if (this.buyCountry == list.uc_country) {
          this.buyUniquePlace = list.uc_field_name;
          this.buyUniqueLength = list.uc_characters;
          if (list.uc_letters == "0") {
            this.buyUniqueType = "number";

            this.buyUniqueCtrl.setValidators(
              Validators.pattern("[0-9]{" + list.uc_characters + "}$")
            );
          } else {
            this.buyUniqueType = "text";

            this.buyUniqueCtrl.setValidators(
              Validators.pattern("[A-Za-z0-9]{" + list.uc_characters + "}$")
            );
          }

        }
      }
    }
  }

  selectDisCountry() {
    // if (this.disCountry == "United State") {
    //   this.uniquDisPlace = "Social Security Number";
    // }
    // else if (this.disCountry == "Australia") {
    //   this.uniquDisPlace = "Tax File Number";
    // }
    // else {
    //   this.uniquDisPlace = "Unique Field";
    // }
    if (this.disCountry == "") {
      this.disUniquePlace = "Unique Field";
    } else {
      for (let list of this.totalList) {
        if (this.disCountry == list.uc_country) {
          this.disUniquePlace = list.uc_field_name;
          this.disUniqueLength = list.uc_characters;
          if (list.uc_letters == "0") {
            this.disUniqueType = "number";

            this.disUniqueCtrl.setValidators(
              Validators.pattern("[0-9]{" + list.uc_characters + "}$")
            );
          } else {
            this.disUniqueType = "text";

            this.disUniqueCtrl.setValidators(
              Validators.pattern("[A-Za-z0-9]{" + list.uc_characters + "}$")
            );
          }

        }
      }
    }
  }
}
