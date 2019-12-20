import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../model/carts';
import { CartsService } from '../Services/carts.service';

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


  constructor(private commonsvc: CommonService, private castssvc: CartsService, private toastr: ToastrService) {
    this.newCart = new Carts();
    this.carts = [];
    this.actiontype = 1;
    this.retailId = this.commonsvc.retaileR.RetailId;
  }
  ngOnInit() {
    this.getCarts();
  }

  getCarts() {
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

}
