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

        var self=this;

        this.getTypes();

        // $('#exampleModal').on('show.bs.modal', function (event) {
        //     var button = $(event.relatedTarget) // Button that triggered the modal
        //     var recipient = button.data('whatever') // Extract info from data-* attributes
        //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        //     var modal = $(this)
        //     debugger
        //   if(button[0].className=="btn")
        //   {
        //     this.name = 'Update ProductType';
        //   }
        //   else
        //   {
        //     this.name = 'Add ProductType';
        //   }
        //   if(button[0].id!=undefined || null)
        //   {
        //       let id=button[0].id;
        //   self.bindpopupdata(id);

          
        //   }

        //     modal.find('.modal-title').text(this.name)
        //     // modal.find('.modal-body input').val(recipient)
        // })

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
                // if(index==1)
                // {
                //     this.types.splice(index,1);
                // }
                // else
                // {
                //     this.types.splice(index-1,1);
                // }
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
