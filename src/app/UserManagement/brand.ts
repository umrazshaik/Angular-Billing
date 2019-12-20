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
  popupshowFlag = false;



  constructor(private commonsvc: CommonService, private brandsvc: BrandsService, private toastr: ToastrService) {
    this.newBrand = new Brands();
    this.brands = [];
    this.retailId = this.commonsvc.retaileR.RetailId;
  }
  ngOnInit() {

    this.getBrands();
    var data=this.brands.filter

    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var recipient = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      console.log('recipient', recipient);
      if(recipient == "Edit Brand") {
             this.brands[2];
      }
      var modal = $(this)
      this.name = recipient ;
      modal.find('.modal-title').text(this.name)
      // modal.find('.modal-body input').val(recipient)
    })

  }

  getBrands() {
    this.brandsvc.getBrands(this.retailId).subscribe((data: any) => {
      this.brands = data;            
      console.log('brandsvc', data);
    });
  }

  openpopup(){
    this.popupshowFlag = true;
  }

  addBrand() {
    this.newBrand.RetailId = this.retailId;
    this.newBrand.Status = true;
    this.newBrand.CreatedBy = this.newBrand.UpdatedBy = this.commonsvc.createdBy;
    console.log(this.newBrand);
    this.brandsvc.addBrand(this.newBrand).subscribe((res: any) => {
      if (res > 0) {
        this.brands.push(this.newBrand);
        this.newBrand = new Brands();
        this.toastr.success('Added');
      }
      else {
        this.toastr.error('failed');
      }
    });
  }

  editBrand(brand: Brands) {    
    this.brandsvc.updateBrand(brand).subscribe((data: any) => {
      console.log(data);
      if (data == 1) {
        this.toastr.success('brand updated');
      } else {
        this.toastr.error("failed");
      }

    });
  }

  deleteBrand(brand: Brands) {

  }

  onSubmit() {

  }

}
