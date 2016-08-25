import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Promotion} from '../promotions/promotion';
import {CacheService} from 'ng2-cache/ng2-cache';

@Injectable()
export class PromotionsService {
    private _url = "http://52.43.46.127:80/api/roost/promotions/";
    
    constructor(private _http: Http, 
                private _promotion: Promotion,
                private _cacheService: CacheService){
    }
    
    createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Token ' +
        this._cacheService.get('accessTokenRooster')); 
    }

    getAllPromotions(): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._url, options)
            .map((res:Response) => {
                    res = res.json();
                    console.log("Got in");
                    error => console.log(error);
            }); 
    }

    postPromotion() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._url, JSON.stringify(this._promotion), options)
            .map(res => res.json());
    }
    
}