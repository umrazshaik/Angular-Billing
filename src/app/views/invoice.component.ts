import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BillingService } from '../Services/billing.service';
import { Bill } from '../model/bill';
import { Retailer } from '../model/Retailer';


@Component({
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {
  objbill: Bill; objretailer: Retailer
  printBtn: boolean = true;
  totalsgst:number=0; totalcgst:number=0;
  constructor(private commonsvc: CommonService, private billsvc: BillingService) {
    //this.objbill=new Bill();
    //this.objretailer=new Retailer();
  }

  ngOnInit() {
    this.getbillinfo();
  }

  getbillinfo() {
    this.commonsvc.getretailId();
    this.objretailer = this.commonsvc.retaileR;
    this.billsvc.getBillingInfo(this.commonsvc.billId).subscribe((data: any) => {
      if (data != null || undefined) {
        // data.forEach(element => {
        //   this.totalsgst=this.totalsgst+element.SGSTPercentage;
        //   this.totalcgst=this.totalcgst+element.CGSTPercentage;
        // });
        this.objbill = data;
      }
    });
  }

  print() {
    this.printBtn = false;
    window.print();
  }

}
