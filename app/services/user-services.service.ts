import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../shared/user';
import {HttpClient} from '../shared/http.client';

@Injectable()
export class UserServices {
    private _url = "http://52.43.46.127:80/api/user/";
    
    constructor(private _http: HttpClient){
    }
    
    updateProfile(user: User){
        return this._http.patch(this._url + "profile", JSON.stringify(user))
            .map(res => res.json());
    }

    getUserInfo(id: number){
        return this._http.get(this._url + "info/"+id)
            .map(res => res.json());
    }
    
}