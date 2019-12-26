import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../model/carts';
import { Bill } from '../model/bill';
import { CartsService } from '../Services/carts.service';
import { BillingService } from '../Services/billing.service';
import { BillingInfo } from '../model/billingInfo';
import { BillingProducts } from '../model/billingProducts';

declare var $: any;

@Component({
  templateUrl: './carts.html',
  styles: [`
  .btn-space {
    margin-right: 5px;
  }
`]
})
export class CartsComponent {
  name: string = 'Carts';
  retailId = 0;
  carts: Array<Carts>;
  newCart: Carts;
  actiontype = 0;
  newobj: Bill;
  cash: string; card: string; online: string;
  pageConfig : any;


  constructor(private commonsvc: CommonService, private castssvc: CartsService, private billsvc: BillingService, private toastr: ToastrService) {
    this.newCart = new Carts();
    this.carts = [];
    this.actiontype = 1;
    //this.retailId = this.commonsvc.retaileR.RetailId;
    this.newobj = new Bill(); this.newobj.BillInfo = new BillingInfo();
    this.cash = 'Cash'; this.card = 'Card'; this.online = 'Online';
    this.pageConfig=commonsvc.pageConfig;
    this.pageConfig.currentPage = 1;
  }
  ngOnInit() {
    this.getCarts();
  }

  getCarts() {
    this.retailId = this.commonsvc.getretailId();
    this.castssvc.getCarts(this.retailId).subscribe((data: any) => {
      this.carts = data;
      console.log('castssvc', data);
    });
  }


  deleteCart(index: number, cart: Carts) {
    debugger
    this.castssvc.deleteCart(cart.CartId).subscribe((data: any) => {
      if (data > 0) {
        this.carts.splice(index, 1);
        this.toastr.success('deleted');
        //this.getCarts();
      }
      else {
        this.toastr.error('failed');
      }
    });
  }

  makepayment(type: number, objbill: Bill) {
    if (type == 1) {

      objbill.BillInfo.PaymentType = this.cash;
      this.cashpayment(objbill);

    }
    else if (type == 2) {
      objbill.BillInfo.PaymentType = this.card;
      this.cardpayment(objbill);
    }
    else if (type == 3) {
      objbill.BillInfo.PaymentType = this.online;
      this.onlinepayment(objbill);
    }
  }

  cashpayment(bill: Bill) {

    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  addplus(objcart: Carts) {
    objcart.Quantity = objcart.Quantity + 1;
  }

  updatecarts(){
    if(this.carts!=null || undefined)
    {
      this.castssvc.updateCart(this.carts).subscribe((data:any)=>{
        if(data>0)
        {
          this.toastr.success('updated');
          this.getCarts();
        }
      });
    }
  }

  cardpayment(bill: Bill) {
    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  onlinepayment(bill: Bill) {

    let objbill = this.billinglogic(bill);

    if (objbill != null || undefined) {
      this.addbilling(objbill);
    }
  }

  addbilling(objbill: Bill) {
    debugger
    this.billsvc.addBilling(objbill).subscribe((data: any) => {
      if (data > 0) {
        this.toastr.success('billing success');
        this.getCarts();
        $("#fid").trigger("reset");
      }
      else {
        this.toastr.error('billing failed');
      }
    });
  }

  billinglogic(objbill: Bill) {

    objbill.BillProducts = new Array<BillingProducts>();
    
    if (this.carts != null || undefined) {
      let totaltaxamount: number = 0;
      let totalbilledamount: number = 0;
      let totalpaidamount: number = 0;
      let totalactualamount: number = 0;

      objbill.BillInfo.RetailId = this.retailId;
      objbill.BillInfo.UserId=this.commonsvc.userId;
      this.carts.forEach(element => {
        let objprod = new BillingProducts();
        objprod.ProductId = element.ProductId;
        objprod.Price = element.Price;
        objprod.Quantity = element.Quantity;
        objprod.Tax = element.TaxAmount;
        objprod.CreatedBy = this.commonsvc.createdBy;
        objprod.UpdatedBy = this.commonsvc.createdBy;
        objbill.BillProducts.push(objprod);
        totaltaxamount = totaltaxamount + element.TaxAmount;
        totalbilledamount = totalbilledamount + element.TotalPrice;
        totalpaidamount = totalpaidamount + element.TotalPrice;

      });

      objbill.BillInfo.BilledAmount = totalbilledamount;
      objbill.BillInfo.PaidAmount = totalpaidamount;
      objbill.BillInfo.TaxAmount = totaltaxamount;
      objbill.BillInfo.ActualAmount = totalbilledamount;
      objbill.BillInfo.CreatedBy = this.commonsvc.createdBy;
      objbill.BillInfo.UpdatedBy = this.commonsvc.createdBy;

    }

    return objbill;
  }
}
