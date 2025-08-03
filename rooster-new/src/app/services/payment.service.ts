import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _url = "http://52.43.46.127/api/payment/";
  accessToken: string | null;

  constructor(private _http: HttpClient) {
    this.accessToken = localStorage.getItem('accessTokenRooster');
  }

  private createAuthorizationHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.accessToken) {
      headers = headers.set('Authorization', `Token ${this.accessToken}`);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  payuCheckSum(txnId: number, amount: number, productInfo: string, firstname: string, email: string): Observable<any> {
    return this._http.post(this._url + "payu_checksum", {
      txnin: txnId,
      amount: amount,
      productInfo: productInfo,
      firstname: firstname,
      email: email
    }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  getOrderId(amount: number, roost: number): Observable<any> {
    return this._http.post(this._url + "orderid", {
      amount: amount,
      roost: roost
    }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  getWallet(): Observable<any> {
    return this._http.get(this._url + "my_wallet", { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  payUPayment(
    key: string,
    txnId: string,
    amount: number,
    productinfo: string,
    firstname: string,
    email: string,
    phone: string,
    hash: string
  ): Observable<any> {
    const payUTestUrl: string = 'https://test.payu.in/_payment';
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    headers = headers.set('Content-Type', 'text/plain');

    return this._http.post(payUTestUrl, {
      key: key,
      txnId: txnId,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: 'https://payu.herokuapp.com/success',
      furl: 'https://payu.herokuapp.com/failure',
      hash: hash,
      service_provider: 'payu_paisa'
    }, { headers: headers })
      .pipe(map((res: any) => res));
  }
}
