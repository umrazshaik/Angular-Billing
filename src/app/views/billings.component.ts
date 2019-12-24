import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BillingService } from '../Services/billing.service';
import { BillingInfo } from '../model/billingInfo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html'
})
export class BillingsComponent implements OnInit {
  billings: Array<BillingInfo>;
  retailId: number;
  pageConfig : any;

  constructor(private commonsvc: CommonService, private toastr: ToastrService, private billsvc: BillingService, private router: Router) {
    this.billings = new Array<BillingInfo>();
    this.pageConfig = commonsvc.pageConfig;
    //this.retailId = this.commonsvc.retaileR.RetailId;
  }

  ngOnInit() {
    this.getBillings();
  }


  getBillings() {
    this.retailId = this.commonsvc.getretailId();
    return this.billsvc.getBillings(this.retailId).subscribe((data: any) => {
      this.billings = data;
    });
  }

  viewbll(objbill: BillingInfo) {
    this.commonsvc.billId = objbill.BillId;

    this.router.navigateByUrl("invoice");

  }

}
