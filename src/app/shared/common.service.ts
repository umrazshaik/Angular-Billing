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
  userId:number=0;
  baseurl: string;
  pageConfig = { itemsPerPage: 5, currentPage: 1, maxSize: 7, autoHide: true };

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
      if (user != null)
      {
        this.retailerId = user.RetailId;
        this.userId=user.UserId;
      }
    }

    if (this.retaileR == null || undefined) {
      var retailer = JSON.parse(localStorage.getItem('retail'));
      this.retaileR = new Retailer();
      this.retaileR = retailer;
    }

    return this.retailerId;
  }

  clearlocalStorage() {
    localStorage.clear();
  }

}
