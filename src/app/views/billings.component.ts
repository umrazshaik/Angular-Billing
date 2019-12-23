import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BillingService } from '../Services/billing.service';
import { BillingInfo } from '../model/billingInfo';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html'
})
export class BillingsComponent implements OnInit {
billings:Array<BillingInfo>;
retailId: number;

  constructor(private commonsvc: CommonService,private toastr: ToastrService,private billsvc:BillingService) {
    this.billings=new Array<BillingInfo>();
    this.retailId = this.commonsvc.retaileR.RetailId;
   }

  ngOnInit() {
    this.getBillings();
  }
  

  getBillings() {
    return this.billsvc.getBillings(this.retailId).subscribe((data: any) => {
        this.billings = data;
    });
}

viewbll(objbill:BillingInfo)
{
  
}

}
