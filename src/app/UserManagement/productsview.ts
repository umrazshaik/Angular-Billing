import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ProductsService } from '../Services/products.service';
import { ProdtypeService } from '../Services/prodtype.service';
import { BrandsService } from '../Services/brands.service';
import { CartsService } from '../Services/carts.service';
import { Products } from '../model/products';
import { ProductType } from '../model/productType';
import { Brands } from '../model/brands';
import { Carts } from '../model/carts';
import { ToastrService } from 'ngx-toastr';




declare var $: any;



@Component({
  templateUrl: './productsview.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsView {
  prods: Array<Products>;
  ptypes: Array<ProductType>;
  brands: Array<Brands>;
  newobj: Products;
  retailId: number;
  header: string;
  actiontype: number;
  selectedbrand: Brands;
  selectedtype: ProductType;

  constructor(private commonsvc: CommonService, private prodsvc: ProductsService, private ptypesvc: ProdtypeService, private bsvc: BrandsService, private csvc: CartsService, private toastr: ToastrService, private cd: ChangeDetectorRef) {
    this.newobj = new Products; this.newobj.Id = 0;
    this.selectedbrand = new Brands;
    this.selectedtype = new ProductType;
    this.header = "Add"; this.actiontype = 1;
  }

  ngOnInit() {
    this.loaddependencies();
  }
  getProducts() {
    this.retailId = this.commonsvc.getretailId();
    return this.prodsvc.getProducts(this.retailId).subscribe((data: any) => {
      this.prods = data;
      console.log(this.prods);
    });
  }
  loaddependencies() {
    this.getProducts();
    this.getptypes();
    this.getbrands();

  }
  getptypes() {
    this.retailId = this.commonsvc.getretailId();
    return this.ptypesvc.getproductTypes(this.retailId).subscribe((data: any) => {
      this.ptypes = data;
    });
  }
  getbrands() {
    this.retailId = this.commonsvc.getretailId();
    this.bsvc.getBrands(this.retailId).subscribe((data: any) => {
      this.brands = data;
    });
  }
  edit(objnew: Products) {
    debugger
    this.header = "Update";
    this.newobj = new Products();

    this.newobj = objnew;
    this.cd.detectChanges();
    this.actiontype = 2;
    console.log(this.newobj);
  }
  closepopup() {
    debugger
    $("#fid").trigger("reset");
    this.header = "Add";
    this.actiontype = 1;
  }
  addp(newp: Products) {

    newp.RetailId = this.retailId;
    newp.Status = true;
    newp.CreatedBy = "admin";
    newp.BrandId = this.selectedbrand.BrandId;
    newp.TypeId = this.selectedtype.TypeId;
    this.prodsvc.addProduct(newp).subscribe((data: any) => {
      if (data > 0) {
        //this.types.push(newtype);
        this.newobj = new Products();
        this.toastr.success('Added');
        this.selectedbrand = new Brands;
        this.selectedtype = new ProductType
        this.getProducts();
      }
      else {
        this.toastr.error('failed');
      }
    });
  }
  updateType(prod: Products) {
    prod.RetailId = this.retailId;
    this.prodsvc.updateProduct(prod).subscribe((data: any) => {
      if (data > 0) {
        this.actiontype = 1;
        this.toastr.success('Updated');
        this.header = "Add";
        this.getProducts();
      }
      else {
        this.toastr.success('not Updated');
      }
    });
  }
  selecttype(filterVal: any) {
    debugger
    if (filterVal == "0") {

    }
    else {
      let stype = this.ptypes.filter((item) => item.TypeId == filterVal);
      if (stype != null || undefined) {
        this.selectedtype = stype[0];
      }
    }
  }
  selectbrand(filterVal: any) {
    debugger
    if (filterVal == "0") {

    }
    else {
      let sbrand = this.brands.filter((item) => item.BrandId == filterVal);
      if (sbrand != null || undefined) {
        this.selectedbrand = sbrand[0];
      }
    }
  }
  submit(type: number, prod: Products) {
    debugger
    if (type == 1) {
      this.addp(prod);
    }
    else {
      this.updateType(prod);
    }
  }

  addtocart(prod: Products) {
    debugger
    let cart = new Carts();
    cart.ProductId = prod.Id;
    cart.Quantity = 1;
    cart.RetailerId = this.retailId;
    this.csvc.addCart(cart).subscribe((data: any) => {
      if (data > 0) {
        this.toastr.success('added to cart');
      }
      else {
        this.toastr.error('not added');
      }
    });

  }
}
