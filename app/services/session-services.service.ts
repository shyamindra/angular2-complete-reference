import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../shared/user';
import {HttpClient} from '../shared/http.client';

@Injectable()
export class SessionServices {
    private _url = "http://52.43.46.127:80/api/session/";
    
    constructor(private _http: Http){
    }
    
    getRequestOptions(params?: URLSearchParams){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // {'Authorization': 'Token ' + this.authToken});
        // console.log('Authorization'+ ':' + 'Token ' + this.authToken);
        if(null == params){
            return new RequestOptions({ headers: headers });
        }
        return new RequestOptions({ headers: headers, search: params});
    }

    requestPin(mobileNumber: number) {
        return this._http.post(this._url + "request_pin", JSON.stringify({mobile_number: mobileNumber}))
            .map(res => res);
    }

    verifyPin(mobileNumber: number, otp: number) {
         return this._http.post(this._url + "verify_pin", JSON.stringify({mobile_number: mobileNumber, auth_token: otp}))
            .map(res => res);
    }

    registerUser(facebook_id: string, facebook_token: string, first_name: string, last_name: string, gender: number, 
            email: string, dob: string, profile_image?: string, mobile?: string){
        return this._http.post(this._url + "register", JSON.stringify({facebook_id: facebook_id, facebook_token: facebook_token, 
            name: first_name, surname: last_name, email: email, dob: dob, gender: gender, mobile_number: mobile}), this.getRequestOptions())
            .map(res => res.json());
    }

    loginUser(facebook_id: string, facebook_token: string){
        console.log(this._http.post(this._url + "register", JSON.stringify({facebook_id: facebook_id, 
            facebook_token: facebook_token}), this.getRequestOptions()));
        return this._http.post(this._url + "register", JSON.stringify({facebook_id: facebook_id, 
            facebook_token: facebook_token}), this.getRequestOptions())
            .map(res => res.json())
            .toPromise();
    }

    handleError(error: any){

    }

    logOutUser(auth: string){
        return this._http.delete(this._url + "logout")
            .map(res => res.json());
    }
    
}