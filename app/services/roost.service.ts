import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CacheService} from 'ng2-cache/ng2-cache';

import {Feed} from '../shared/feed';
import {User} from '../shared/user';

@Injectable()
export class RoostService {
    private _url = "http://52.43.46.127:80/api/roost/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
    }
    
    getFeeds(page?: number): Observable<any>  {
        var url = this._url + "feeds/";
        if(null != page)
            url += "?page=" + page;
        return this._http.get(url)
            .map((res: Response) => res.json());
    }

    search(key: string): Observable<any>{
        var myHeader = new Headers();
                myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "search/" + key + "/", {headers: myHeader})
            .map((res: Response) => res.json());
    }
    
}