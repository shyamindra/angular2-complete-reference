import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {HttpClient} from '../shared/http.client';
import {Promotion} from '../promotions/promotion';

@Injectable()
export class PromotionsService {
    private _url = "http://52.37.61.173:8000/api/v1/promotions/promotion";
    
    constructor(private _http: HttpClient, private _promotion: Promotion){
    }
    
    getPromotions(id: string) {
        return this._http.get(this._url+"/"+id)
            .map(res => res.json());
    }

    postPromotion() {
        return this._http.post(this._url, JSON.stringify(this._promotion))
            .map(res => res.json());
    }
    
}