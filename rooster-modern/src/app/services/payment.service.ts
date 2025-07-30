import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CacheService} from 'ng2-cache/ng2-cache';

import {Roost} from '../shared/roost';
import {User} from '../shared/user';

@Injectable()
export class PaymentService {
    private _url = "http://52.43.46.127/api/payment/";
    accessToken: string;

    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }

    payuCheckSum(txnId: number, amount: number, productInfo: string, firstname: string, email: string): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "payu_checksum", JSON.stringify({txnin: txnId,
            amount: amount, productInfo: productInfo, firstname: firstname, email: email}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    getOrderId(amount: number, roost: number): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        // console.log(this.accessToken);
        return this._http.post(this._url + "orderid", JSON.stringify({amount: amount, roost: roost}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    getWallet(): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "my_wallet", {headers: myHeader})
            .map((res: Response) => res.json());
    }

    payUPayment(key: string, 
            txnId: string,
            amount: number, 
            productinfo: string, 
            firstname: string,
            email: string, 
            phone: string,
            hash: string): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Access-Control-Allow-Origin', '*');
        myHeader.append('Access-Control-Allow-Methods' ,'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        myHeader.append('Access-Control-Allow-Headers',  'Origin, Content-Type, X-Auth-Token');
        myHeader.append('Content-Type', 'text/plain');
        var payUProdUrl: string = 'https://secure.payu.in/_payment';
        var payUTestUrl: string = 'https://test.payu.in/_payment';
        
        return this._http.post(payUTestUrl , JSON.stringify(
                {key: key,
                txnId: txnId,
                amount: amount.valueOf(),
                productinfo: productinfo,
                firstname: firstname,
                email: email,
                phone: phone,
                surl: 'https://payu.herokuapp.com/success',
                furl: 'https://payu.herokuapp.com/failure',
                hash: hash,
                service_provider: 'payu_paisa'}), 
                {headers: myHeader})
                    .map((res: Response) => res);
    }
}
