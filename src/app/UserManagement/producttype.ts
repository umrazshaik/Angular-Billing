import { Component, HostListener } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ProdtypeService } from '../Services/prodtype.service';
import { ProductType } from '../model/productType';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
    templateUrl: './producttype.html',
})
export class ProductTypeComponent {
    name: string = 'Product Type';
    types: Array<ProductType>
    newtype: ProductType;
    objProductType: ProductType;
    retailId: number;
    header: string;
    actiontype: number;
    pageConfig: any;
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closepopup();
    }

    constructor(private commonsvc: CommonService, private prodtypesvc: ProdtypeService, private toastr: ToastrService) {
        this.newtype = new ProductType;
        this.header = "Add Product Type";
        this.actiontype = 1;
        this.pageConfig = commonsvc.pageConfig;
        this.pageConfig.currentPage = 1;
    }

    ngOnInit() {
        this.getTypes();
    }


    getTypes() {
        this.retailId = this.commonsvc.getretailId();
        return this.prodtypesvc.getproductTypes(this.retailId).subscribe((data: any) => {
            this.types = data;
        });
    }

    edittype(newobject: ProductType) {
        debugger
        this.header = "Update Product Type";
        this.newtype = new ProductType();
        this.newtype.Name=newobject.Name;
        this.objProductType=newobject;
        this.actiontype = 2;        
    }

    createProductType() {
        this.newtype = new ProductType();
    }

    addType(newtype: ProductType,form: NgForm) {
        newtype.RetailId = this.retailId;
        newtype.Status = true;
        newtype.CreatedBy = newtype.UpdatedBy = this.commonsvc.createdBy;
        this.prodtypesvc.addProductType(newtype).subscribe((data: any) => {
            if (data > 0) {
                newtype.TypeId=data;
                this.types.push(newtype);
                this.newtype = new ProductType();
                this.toastr.success('Added');
                form.reset();
            }
            else {
                this.toastr.error('failed');
                form.reset();
            }
        });
    }
    updateType(prodtype: ProductType,form: NgForm) {
        this.objProductType.Name=prodtype.Name;
        this.prodtypesvc.updateProductType(this.objProductType).subscribe((data: any) => {
            if (data > 0) {
                this.actiontype = 1;
                this.toastr.success('Updated');
                this.header = "Add Product Type";
                this.getTypes();
                form.reset();
            }
            else {
                this.toastr.success('not Updated');
                form.reset();
            }
        });
    }

    deleteType(index: number, pt: ProductType) {
        this.prodtypesvc.deleteProductType(pt.TypeId).subscribe((data: any) => {
            if (data > 0) {
                this.types.splice(index, 1);
                this.toastr.success('deleted');
                //this.getTypes();
            }
            else {
                this.toastr.success('not deleted');
            }
        });
    }

    //popup controling code here
    submit(type: number, prodtype: ProductType,form: NgForm) {
        $('#exampleModal').modal('hide');
        if (type == 1) {
            this.addType(prodtype,form);
        }
        else {
            this.updateType(prodtype,form);
        }
        
    }

    closepopup(form: NgForm =null) {
       
        $('#exampleModal').modal('hide');
        this.header = "Add Product Type";
        this.actiontype = 1;
        form.reset();
    }
}
