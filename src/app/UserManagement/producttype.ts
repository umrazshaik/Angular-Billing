import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ProdtypeService } from '../Services/prodtype.service';
import { ProductType } from '../model/productType';
import { ToastrService } from 'ngx-toastr';

declare var $: any;





@Component({
    templateUrl: './producttype.html',
})
export class ProductTypeComponent {
    name: string = 'Product Type';
    types: ProductType[]
    newtype: ProductType
    retailId: number;

    constructor(private commonsvc: CommonService, private prodtypesvc: ProdtypeService, private toastr: ToastrService) {
        this.newtype = new ProductType;
    }

    ngOnInit() {

        this.getTypes().subscribe((data: any) => {
            this.types = data;
        });

        $('#exampleModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever') // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
             
            this.name = 'Add ProductType';
            modal.find('.modal-title').text(this.name)
            // modal.find('.modal-body input').val(recipient)
        })

    }

    getTypes() {
        this.retailId = this.commonsvc.retaileR.RetailId;
        return this.prodtypesvc.getproductTypes(this.retailId);
    }

    addType(newtype: ProductType) {
         
        newtype.RetailId = this.retailId;
        newtype.Status = true;
        newtype.CreatedBy = "admin";
        this.prodtypesvc.addProductType(newtype).subscribe((data: any) => {
            if (data > 0) {
                this.types.push(newtype);
                this.newtype = new ProductType();
                this.toastr.success('Added');
            }
            else {
                this.toastr.error('failed');
            }
        });
    }
    updateType(prodtype: ProductType) {
        prodtype.RetailId = this.retailId;
        this.prodtypesvc.updateProductType(prodtype).subscribe((data: any) => {
            if (data > 0)
                console.log('updated');
            else
                console.log('not updated');
        });
    }
    deleteType(typeId: number) {
        this.prodtypesvc.deleteProductType(typeId).subscribe((data: any) => {
            if (data > 0)
                console.log('deleted');
            else
                console.log('not deleted');
        });
    }
}
