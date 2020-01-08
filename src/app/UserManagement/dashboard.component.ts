import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../Services/billing.service';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { BillingInfo } from '../model/billingInfo';


@Component({
  templateUrl: './dashboard.html'
})
export class DashBoardComponent {
  billings3: Array<BillingInfo>;
  billingsw: Array<BillingInfo>;
  billingsm: Array<BillingInfo>;
  billingsa: Array<BillingInfo>;
  retailId: number;
  threedays: number = 0;
  weekly: number = 0;
  monthly: number = 0;
  annualy: number = 0;
  constructor(private router: Router, private commonsvc: CommonService, private billsvc: BillingService, private toastr: ToastrService, private loader: SpinnerService) {

  }
  name = 'Angular';

  ngOnInit() {
    this.getBillings();
  }
  getbillsbyweek() {
    
    let tdate = new Date().toLocaleDateString();
    let today = new Date();
    let in_a_week = new Date().setDate(today.getDate() - 6);
    let fdate = new Date(in_a_week).toLocaleDateString();
    return this.billsvc.getbillsbydates(this.retailId, fdate, tdate).subscribe((data: any) => {
      this.billingsw = data;
      if (this.billingsw.length > 0) {
      this.billingsw.forEach(element => {
        this.weekly = this.weekly + element.BilledAmount;
      });}
      this.getbillsbymonth();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });

  }
  getbillsbymonth() {
    
    let tdate = new Date().toLocaleDateString();
    let today = new Date();
    let in_a_week = new Date().setDate(today.getDate() - 30);
    let fdate = new Date(in_a_week).toLocaleDateString();
    return this.billsvc.getbillsbydates(this.retailId, fdate, tdate).subscribe((data: any) => {
      this.billingsm = data;
      if (this.billingsm.length > 0) {
      this.billingsm.forEach(element => {
        this.monthly = this.monthly + element.BilledAmount;
      });}
      this.getbillsbyannual();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });

  }
  getbillsbyannual() {
    
    let tdate = new Date().toLocaleDateString();
    let today = new Date();
    let in_a_week = new Date().setDate(today.getDate() - 365);
    let fdate = new Date(in_a_week).toLocaleDateString();
    return this.billsvc.getbillsbydates(this.retailId, fdate, tdate).subscribe((data: any) => {
      this.billingsa = data;
      if (this.billingsa.length > 0) {
        this.billingsa.forEach(element => {
          this.annualy = this.annualy + element.BilledAmount;
        });
      }
      this.loader.hide();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });

  }
  getBillings() {
    this.loader.show();
    
    let tdate = new Date().toLocaleDateString();
    let today = new Date();
    let in_a_week = new Date().setDate(today.getDate() - 3);
    let fdate = new Date(in_a_week).toLocaleDateString();
    this.retailId = this.commonsvc.getretailId();
    return this.billsvc.getbillsbydates(this.retailId, fdate, tdate).subscribe((data: any) => {
      this.billings3 = data;
      if (this.billings3.length > 0) {
        this.billings3.forEach(element => {
          this.threedays = this.threedays + element.BilledAmount;
        });
      }
      this.getbillsbyweek();
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }


  redirect() {

    this.router.navigate(['/products']);
  }

}
