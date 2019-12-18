import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { Products } from '../model/products';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpbaseService) { }

    getProducts(retailId: number) {
        return this.http.getJson("api/product/getp?retailerId=" + retailId);
    }

    addProduct(prod: Products) {
        return this.http.postJson(prod, "api/product/addp");
    }

    updateProduct(prod: Products) {
        return this.http.postJson(prod, "api/product/updatep");
    }

    deleteProduct(prodId: number) {
        return this.http.delete("api/brands/product?productId=" + prodId);
    }
}
