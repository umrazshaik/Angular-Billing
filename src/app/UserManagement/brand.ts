import { Component, HostListener } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { Brands } from '../model/brands';
import { BrandsService } from '../Services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';

declare var $: any;

@Component({
  templateUrl: './brand.html',
  styles: [`
  .table td {
    padding: 0.25rem; }
  `]
})
export class BrandComponent {
  name: string = 'Product Type';
  retailId = 0;
  brands: Array<Brands>;
  newBrand: Brands;
  objBrand: Brands;
  header = '';
  actiontype = 0;
  pageConfig: any;
  filterStr: string;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closepopup();
  }

  constructor(private commonsvc: CommonService, private brandsvc: BrandsService, private toastr: ToastrService,private loader:SpinnerService) {
    this.newBrand = new Brands();
    this.brands = [];
    this.header = "Add";
    this.actiontype = 1;
    this.pageConfig = commonsvc.pageConfig;
    this.pageConfig.currentPage = 1;
    //this.retailId = this.commonsvc.retaileR.RetailId;
  }
  ngOnInit() {
    this.getBrands();
    this.commonsvc.pullSearchStr().subscribe(p => { this.filterStr=p});
  }

  getBrands() {
    this.loader.show();
    this.retailId = this.commonsvc.getretailId();    
    this.brandsvc.getBrands(this.retailId).subscribe((data: any) => {
      this.brands = data;
      this.loader.hide();
      console.log(data);
    },er=>{
      this.toastr.error('loading failed');
      this.loader.hide();});
  }

  createBrand() {
    this.newBrand = new Brands();
    this.newBrand.BrandName = '';
    this.header = "Add Brand";
    this.actiontype = 1;
  }
  addBrand() {
    this.newBrand.RetailId = this.retailId;
    this.newBrand.Status = true;
    this.newBrand.CreatedBy = this.newBrand.UpdatedBy = this.commonsvc.createdBy;
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
    this.objBrand = editband;
    this.newBrand = new Brands();
    this.newBrand.BrandName = editband.BrandName;
    this.actiontype = 2;
    console.log(this.newBrand);
  }

  updateBrand(brand: Brands) {
    this.objBrand.BrandName = brand.BrandName;
    this.brandsvc.updateBrand(this.objBrand).subscribe((data: any) => {
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
      if (data > 0) {
        this.brands.splice(index, 1);
        this.toastr.success('deleted');
        //this.getBrands();
      }
      else {
        this.toastr.error('not deleted');
      }
    });
  }

  //pop up controlling code here
  submit(type: number, brand: Brands) {
    $('#exampleModal').modal('hide');
    if (type == 1) {
      this.addBrand();
    }
    else {
      this.updateBrand(brand);
    }
  }

  closepopup() {
    $('#exampleModal').modal('hide')
    this.header = "Add";
    this.actiontype = 1;
  }


}
