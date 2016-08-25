import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../shared/user';
import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class UserServices {
    private _url = "http://52.43.46.127:80/api/user/";
    
    constructor(private _http: Http, private _cacheService: CacheService){
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', 'Token ' +
            this._cacheService.get('accessTokenRooster')); 
        headers.append('Content-Type', 'text/plain'); 
    }


    updateProfile(user: User){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        return this._http.patch(this._url + "profile", JSON.stringify(user), options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getUserInfo(id: number){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        console.log(this._url + "info/" + id);
        console.log(options);
        return this._http.get(this._url + "info/" + id, options)
            .map((res:Response) => {
                console.log(res),
                error => console.log(error),
                () => console.log('yay')});
    }

    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
    
}