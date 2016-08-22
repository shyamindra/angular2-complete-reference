import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import {Cache} from '../shared/cache';

@Injectable()
export class HttpClient {
    http: Http;
    authToken: string;
    handleError: any;
  constructor(http: Http, cache: Cache) {
    this.http = http;
    if(cache.isUserLoggedIn())
      this.authToken = cache.getToken(); 
  }

  getRequestOptions(params?: URLSearchParams){
    let headers = new Headers(
      {'Authorization': 'Token ' + this.authToken});
      console.log('Authorization'+ ':' + 'Token ' + this.authToken);
    if(null == params){
        return new RequestOptions({ headers: headers });
    }
    return new RequestOptions({ headers: headers, search: params});
  }
  
  get(url: string, params?: URLSearchParams) {
    if(null == params){
        return this.http.get(url, this.getRequestOptions())
                .map(res =>  res.json())
                .catch(this.handleError);;    
    }
    return this.http.get(url, this.getRequestOptions(params))
                .map(res =>  res.json())
                .catch(this.handleError);;
  }

  post(url: string, data?: any) {
    return this.http.post(url, data, this.getRequestOptions())
                .map(res =>  res.json())
                .catch(this.handleError);
  }
  
  patch(url: string, data?: string){
    return this.http.patch(url, data, this.getRequestOptions())
                .map(res =>  res.json())
                .catch(this.handleError);;  
  }
  
  delete(url: string){
    return this.http.delete(url, this.getRequestOptions())
                .map(res =>  res.json())
                .catch(this.handleError);;  
  }
}