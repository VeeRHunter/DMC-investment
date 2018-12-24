import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// let apiurl: string = "http://192.168.2.146/digitalmining/apiserver/";


let apiurl: string = "http://traxprint.asia/dmc-investment/index.php";


@Injectable()
export class ServerProvider {

  constructor(public http: Http) {
    console.log('Hello PeopleproviderProvider Provider');
  }


  postData(credentials) {
    return new Promise((resolve, reject) => {

      this.http.post(apiurl, credentials).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });

    });
  }
}
