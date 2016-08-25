import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Feed} from '../shared/feed';
import {User} from '../shared/user';

@Injectable()
export class RoostService {
    private _url = "http://52.43.46.127:80/api/roost/";
    
    constructor(private _http: Http){
    }
    
    getFeeds(): Observable<any>  {
        return this._http.get(this._url + "feeds/")
            .map((res: Response) => res.json());
    }
    
}