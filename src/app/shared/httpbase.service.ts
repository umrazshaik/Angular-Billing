import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppintializorService } from '../shared/appintializor.service'

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
    constructor(private httpClient: HttpClient, private appInitializerService: AppintializorService) {
        //this.baseUrl = appInitializerService.baseUrl;
        //console.log(this.baseUrl);
    }

    requestOptions: any = {
        headers: new HttpHeaders(this.Headers),
    };


    requestOptionsForUpload: any = {
        headers: new HttpHeaders()
    };

    postJson(postObject: any, url: string) {
        return this.httpClient.post(this.baseUrl + url, postObject, this.requestOptionsForUpload);
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

    getJsonWithHeader(url: string, token: any) {
        this.requestOptions.headers = this.requestOptions.headers.append('token', token);
        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }
}
