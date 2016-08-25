import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Complaint} from '../complaints/complaint';
import {Http, Headers, Response} from '@angular/http';

import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class ComplaintsService {
    private _url = "http://192.168.1.6:8000/api/roost/promotions/";
    accessToken: string;
    
     constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }

    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
    }
    
    getAllComplaints(): Observable<any> {
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url, { headers : myHeader})
            .map((res: Response) => res.json());
    }
    postComplaints() {
        return this._http.post(this._url, null)
            .map(res => res.json());
    }
    
}