import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Promotion} from '../promotions/promotion';
import {CacheService} from 'ng2-cache/ng2-cache';


@Injectable()
export class PromotionsService {
    private _url = "http://192.168.1.6:8000/api/roost/promotions/";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
    }

    getAllPromotions(): Observable<any> {
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url, { headers : myHeader})
            .map((res: Response) => res.json());
    }

    postPromotion() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._url, options)
            .map(res => res.json());
    }
    
}