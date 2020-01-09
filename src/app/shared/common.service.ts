import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Retailer } from '../model/Retailer'
import { PageConfig } from '../model/pageConfig';


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
  userId: number = 0;
  baseurl: string;
  private _searchBS = new BehaviorSubject<string>('');
  private _sliderToggleBS = new BehaviorSubject<boolean>(false);
  private sliderStatus: boolean;
  slider = this._sliderToggleBS.asObservable();
  pageConfig: PageConfig = { itemsPerPage: 5, currentPage: 1, maxSize: 7, autoHide: true };

  //gloabl file upload config
  fileuploadConfig: any = {
    import: {
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      btnName: 'Import'
    }
  };

  constructor() {

    //this.retaileR = new Retailer();
    //this.retaileR.RetailId = 1;

  }

  pushSearchStr(val: string) {
    this._searchBS.next(val);
  }

  pullSearchStr() {
    return this._searchBS.asObservable();
  }

  setRetailer(objretailer: Retailer) {
    this.retaileR = objretailer;
  }

  sliderToggle() {
    if (this.sliderStatus)
      this.sliderClose();
    else
      this.sliderOpen();
  }

  sliderOpen() {
    this.sliderStatus = true;
    this._sliderToggleBS.next(true);
  }
  sliderClose() {
    this.sliderStatus = false;
    this._sliderToggleBS.next(false);    
  }

  getretailId() {
    if (this.retailerId == 0 || undefined || null) {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.retailerId = user.RetailId;
        this.userId = user.UserId;
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

  setCurrentPage(cpageConfig: PageConfig, deletedItemIndex: number, totalItems: number) {
    debugger
    deletedItemIndex += 1;
    let reminder = deletedItemIndex % cpageConfig.itemsPerPage;
    if (cpageConfig.currentPage > 1 &&
      totalItems == deletedItemIndex && reminder == 1) {
      return cpageConfig.currentPage - 1;
    }
    return cpageConfig.currentPage;
  }

}
