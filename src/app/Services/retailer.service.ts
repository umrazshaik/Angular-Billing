import { Injectable } from '@angular/core';
import { AppintializorService } from '../shared/appintializor.service'
import { HttpbaseService } from '../shared/httpbase.service'
import { Retailer } from '../model/Retailer'

@Injectable({
    providedIn: 'root'
})
export class RetailerService {
    retailer: Retailer;
    
    constructor(private http: HttpbaseService) {
    }

    getretailer()
    {
        debugger
        return this.http.getJson("api/retailer/getr");
    }
    


}
