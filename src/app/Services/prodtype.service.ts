import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { ProductType } from '../model/productType';



@Injectable({
    providedIn: 'root'
})
export class ProdtypeService {

    constructor(private http: HttpbaseService) { }

    getproductTypes(retailId: number) {
        return this.http.getJson("api/productType/gett?retailerId=" + retailId);
    }

    addProductType(prodtype: ProductType) {
        return this.http.postJson(prodtype, "api/productType/addt");
    }

    updateProductType(prodtype: ProductType) {
        return this.http.postJson(prodtype, "api/productType/updatett");
    }

    deleteProductType(typeId: number) {
        return this.http.delete("api/productType/deletet?typeId=" + typeId);
    }
}
