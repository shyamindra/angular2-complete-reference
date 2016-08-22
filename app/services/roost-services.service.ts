import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Feed} from '../shared/feed';

import {User} from '../shared/user';
import {HttpClient} from '../shared/http.client';

@Injectable()
export class RoostService {
    private _url = "http://52.43.46.127:80/api/roost/";
    
    constructor(private _http: Http){
    }
    
    getFeeds() {
        console.log(this._url + "feeds/");
        return this._http.get(this._url + "feeds/")
            .toPromise()
            .then((res: Response) => res.json().results as Feed[]);
    }
    
}