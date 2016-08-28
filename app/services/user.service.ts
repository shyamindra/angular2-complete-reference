import {Injectable} from '@angular/core';
import {Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../shared/user';
import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class UserService {
    private _url = "http://52.43.46.127:80/api/user/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
        headers.append('Content-Type', 'text/plain');
    }

    updateProfile(facebook_id: string, 
            facebook_token: string, 
            first_name: string, 
            last_name: string, 
            gender: number, 
            email: string, 
            dob: string, 
            mobile?: string,
            profile_image?: string): Observable<any>{
                var myHeader = new Headers();
                myHeader.append('Authorization', this.accessToken);
        return this._http.patch(this._url + "profile", 
                JSON.stringify({facebook_id: facebook_id, 
                    facebook_token: facebook_token, 
                    name: first_name, 
                    surname: last_name, 
                    email: email, 
                    dob: dob, 
                    gender: gender, 
                    mobile_number: mobile}), 
                    {headers: myHeader})
                .map(res => res.json());
    }

    getUserInfo(id: number): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "info/" + id, { headers : myHeader})
            .map((res: Response) => res.json());
    }
    
}