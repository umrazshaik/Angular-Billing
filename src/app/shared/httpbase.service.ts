import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppintializorService } from '../shared/appintializor.service'
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class HttpbaseService {

    baseUrl: any
    Headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    constructor(private httpClient: HttpClient, private appInitializerService: AppintializorService,private cmnsvc:CommonService) {
        this.baseUrl = appInitializerService.baseUrl;
        console.log(this.baseUrl);
    }

    requestOptions: any = {
        headers: new HttpHeaders(this.Headers),
        //headers:new HttpHeaders().append().append()
    };


    requestOptionsForUpload: any = {
        headers: new HttpHeaders()
    };

    postJsonLogin(postObject: any, url: string) {
        debugger
        return this.httpClient.post(this.baseUrl + url, postObject,this.requestOptionsForUpload)
      }

    postJson(postObject: any, url: string) {
        debugger
        let tkn=String(this.cmnsvc.token);
        return this.httpClient.post(this.baseUrl + url, postObject, {
            headers:new HttpHeaders().append("Authorization","Basic "+ "text")
            .append("Content-Type", "application/x-www-form-urlencoded")
        });
    }

    postJsonP(postObject: any, url: string) {
        return this.httpClient.post(this.baseUrl + url, postObject, this.requestOptions);
    }

    put(postObject: any, url: string) {
        return this.httpClient.put(this.baseUrl + url, postObject, this.requestOptions);
    }

    delete(url: string) {
        return this.httpClient.delete(this.baseUrl + url, this.requestOptions);
    }

    getJson(url) {

        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }

    getBlob(url) {
        return this.httpClient.get(this.baseUrl + url, { responseType: 'blob' });
    }

    getJsonWithHeader(url: string, token: any) {
        this.requestOptions.headers = this.requestOptions.headers.append('token', token);
        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }
}
