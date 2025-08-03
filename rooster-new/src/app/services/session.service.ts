import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _url = "http://52.43.46.127:80/api/session/";
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

  requestPin(mobileNumber: number): Observable<any> {
    return this._http.post(this._url + "request_pin", { mobile_number: mobileNumber }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  verifyPin(mobileNumber: number, otp: number): Observable<any> {
    return this._http.post(this._url + "verify_pin", { mobile_number: mobileNumber, OTP: otp }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  registerUser(
    facebook_id: string,
    facebook_token: string,
    first_name: string,
    last_name: string,
    gender: number,
    email: string,
    dob: string,
    profile_image?: string,
    mobile?: string
  ): Observable<any> {
    return this._http.post(this._url + "register", {
      facebook_id: facebook_id,
      facebook_token: facebook_token,
      name: first_name,
      surname: last_name,
      email: email,
      dob: dob,
      gender: gender,
      mobile_number: mobile
    }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  registerMobileUser(
    first_name: string,
    last_name: string,
    gender: number,
    email: string,
    dob: string,
    mobile: string,
    profile_image?: string
  ): Observable<any> {
    return this._http.post(this._url + "register", {
      name: first_name,
      surname: last_name,
      email: email,
      dob: dob,
      gender: gender,
      mobile_number: mobile
    }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  loginUser(
    facebook_id: string,
    facebook_token: string
  ): Observable<any> {
    return this._http.post(this._url + "register", {
      facebook_id: facebook_id,
      facebook_token: facebook_token
    }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  loginMobileUser(mobile: string): Observable<any> {
    return this._http.post(this._url + "register", { mobile: mobile }, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  logOutUser(): Observable<any> {
    return this._http.delete(this._url + "logout", { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

}
