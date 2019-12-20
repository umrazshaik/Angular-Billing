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
    types: Array<ProductType>
    newtype: ProductType
    retailId: number;
    header:string;
    actiontype:number;

    constructor(private commonsvc: CommonService, private prodtypesvc: ProdtypeService, private toastr: ToastrService) {
        this.newtype = new ProductType;
        this.header="Add"; this.actiontype=1;
    }

    ngOnInit() {
        this.getTypes();
    }

    bindpopupdata(id: any)
          {
                let editobject=this.types.filter(o=>o.TypeId==id);
                this.newtype =editobject[0] ;
                console.log(this.newtype);
          }
    getTypes() {
        this.retailId = this.commonsvc.retaileR.RetailId;
        return this.prodtypesvc.getproductTypes(this.retailId).subscribe((data: any) => {
            this.types = data;
        });
    }

    edittype(newobject:ProductType)
    {
        debugger
        this.header="Update";
        this.newtype=newobject;
        this.actiontype=2;
        console.log(this.newtype);
    }

    closepopup()
    {
        debugger
        $("#fid").trigger("reset");
        this.header="Add";
        this.actiontype=1;
    }

    addType(newtype: ProductType) {
         
        newtype.RetailId = this.retailId;
        newtype.Status = true;
        newtype.CreatedBy = "admin";
        this.prodtypesvc.addProductType(newtype).subscribe((data: any) => {
            if (data > 0) {
                //this.types.push(newtype);
                this.newtype = new ProductType();
                this.toastr.success('Added');
                this.getTypes();
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
            {
                this.actiontype=1;
                this.toastr.success('Updated');
                this.header="Add";
                this.getTypes();
            }
            else
            {
                this.toastr.success('not Updated');
            }
        });
    }
    deleteType(index: number,pt:ProductType) {
        debugger
        this.prodtypesvc.deleteProductType(pt.TypeId).subscribe((data: any) => {
            if (data > 0)
            {
                this.types.splice(index,1);
                this.toastr.success('deleted');
                this.getTypes();
            }
            else
            {
            this.toastr.success('not deleted');
            }
        });
    }

    submit(type:number,prodtype:ProductType)
    {
        debugger
        if(type==1)
        {
            this.addType(prodtype);
        }
        else
        {
            this.updateType(prodtype);
        }
    }
}
