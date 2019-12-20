import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { Brands } from '../model/brands';
import { BrandsService } from '../Services/brands.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  templateUrl: './brand.html',
})
export class BrandComponent {
  name: string = 'Product Type';
  retailId = 0;
  brands: Array<Brands>;
  newBrand: Brands;
  header = '';
  actiontype = 0;


  constructor(private commonsvc: CommonService, private brandsvc: BrandsService, private toastr: ToastrService) {
    this.newBrand = new Brands();
    this.brands = [];
    this.header = "Add";
    this.actiontype = 1;
    this.retailId = this.commonsvc.retaileR.RetailId;
  }
  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.brandsvc.getBrands(this.retailId).subscribe((data: any) => {
      this.brands = data;
      console.log('brandsvc', data);
    });
  }

  closepopup() {
    debugger    
    this.header = "Add";
    this.actiontype = 1;
  }
  enterKeyEvent(event: any){
    console.log(event);

  }
  createBrand(){
    this.newBrand=new Brands();
    this.newBrand.BrandName='';
    this.header = "Add Brand";
    this.actiontype=1;
  }
  addBrand() {
    this.newBrand.RetailId = this.retailId;
    this.newBrand.Status = true;
    this.newBrand.CreatedBy = this.newBrand.UpdatedBy = this.commonsvc.createdBy;
    console.log(this.newBrand);
    this.brandsvc.addBrand(this.newBrand).subscribe((res: any) => {
      if (res > 0) {
        this.newBrand.BrandId = res;
        this.brands.push(this.newBrand);
        this.newBrand = new Brands();
        this.toastr.success('Added');
      }
      else {
        this.toastr.error('failed');
      }
    });
  }

  editBrand(editband: Brands) {
    this.header = "Update Brand";
    this.newBrand = editband;
    this.actiontype = 2;
    console.log(this.newBrand);
  }

  updateBrand(brand: Brands) {
    this.brandsvc.updateBrand(brand).subscribe((data: any) => {
      console.log(data);
      if (data == 1) {
        this.actiontype = 1;
        this.toastr.success('Updated');        
      } else {
        this.toastr.error("failed");
      }

    });
  }

  deleteBrand(index: number, brand: Brands) {
    debugger
    this.brandsvc.deleteBrand(brand.BrandId).subscribe((data: any) => {
      if (data > 0)
      {                
          this.brands.splice(index,1);
          this.toastr.success('deleted');
          //this.getBrands();
      }
      else
      {
      this.toastr.success('not deleted');
      }
    });
  }

  onSubmit() {

  }
  submit(type: number, brand: Brands) {
    debugger
    if (type == 1) {
      this.addBrand();
    }
    else {
      this.updateBrand(brand);
    }
  }

}
