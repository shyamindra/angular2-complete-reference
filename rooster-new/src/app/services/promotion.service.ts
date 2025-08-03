import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private _url = "http://52.43.46.127:80/api/roost/promotions/";
  accessToken: string | null;

  constructor(private _http: HttpClient) {
    this.accessToken = localStorage.getItem('accessTokenRooster');
  }

  private createAuthorizationHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.accessToken) {
      headers = headers.set('Authorization', `Token ${this.accessToken}`);
    }
    headers = headers.set('Content-Type', 'text/plain');
    return headers;
  }

  getAllPromotions(page?: number): Observable<any> {
    let url = this._url;
    if (null != page) {
      url += `?page=${page}`;
    }
    return this._http.get(url, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  postPromotion(): Observable<any> {
    return this._http.post(this._url, null, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

}
