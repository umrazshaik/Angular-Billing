import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AppintializorService {
    baseUrl: string = "";
    configUrl = 'assets/serverconfig.json'
    constructor(private http: HttpClient) {
        
    }

    loadServerConfig() {
        debugger
        return this.http.get(this.configUrl)
            .toPromise();
    }
}
