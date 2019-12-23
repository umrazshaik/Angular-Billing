import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Retailer } from '../model/Retailer'



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //private retailer = new BehaviorSubject<Retailer>(null);
  //retaileR = this.retailer.asObservable();
  createdBy = 'admin';
  retaileR: Retailer;
  billId: number;
  retailerId: number = 0;
  baseurl: string;

  constructor() {

    //this.retaileR = new Retailer();
    //this.retaileR.RetailId = 1;

  }

  setRetailer(objretailer: Retailer) {

    this.retaileR = objretailer;
  }

  getretailId() {
    if (this.retailerId == 0 || undefined || null) {
      var user = JSON.parse(localStorage.getItem('user'));
      this.retailerId = user.RetailId;
    }
    else
      this.retailerId = this.retailerId;

    // if (this.baseurl == '' || undefined || null) {
    //   var base = JSON.stringify(localStorage.getItem('baseurl'));
    //   this.baseurl = base;
    // }

    if (this.retaileR == null || undefined) {
      var retailer = JSON.parse(localStorage.getItem('retail'));
      this.retaileR=new Retailer();
      this.retaileR=retailer;
    }

    return this.retailerId;
  }
}
