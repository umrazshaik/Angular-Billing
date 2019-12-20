import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Retailer } from '../model/Retailer'


@Injectable({
  providedIn: 'root'
})
export class CommonService {
    //private retailer = new BehaviorSubject<Retailer>(null);
    //retaileR = this.retailer.asObservable();

    retaileR: Retailer

    constructor() {

      this.retaileR=new Retailer();
      this.retaileR.RetailId=1;
       
    }

    setRetailer(objretailer: Retailer) {
        debugger
        this.retaileR = objretailer;
    }
}
