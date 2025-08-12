import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = "http://52.43.46.127:80/api/user/";
  accessToken: string | null;

  constructor(private _http: HttpClient) {
    this.accessToken = localStorage.getItem('accessTokenRooster');
  }

  private createAuthorizationHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.accessToken) {
      headers = headers.set('Authorization', `Token ${this.accessToken}`);
    }
    return headers;
  }

  updateProfilePic(profile_image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("profile_image", profile_image);

    let headers = this.createAuthorizationHeaders();
    // HttpClient automatically sets Content-Type for FormData, so no need to set it manually
    // headers = headers.set('Content-Type', 'multipart/form-data'); // Do NOT set this manually

    return this._http.patch(this._url + 'profile', formData, { headers: headers })
      .pipe(map((res: any) => res));
  }

  updateProfile(
    facebook_id: string,
    facebook_token: string,
    first_name: string,
    last_name: string,
    gender: number,
    email: string,
    dob: string,
    city?: string,
    profession?: string,
    mobile?: string,
    profile_image?: string
  ): Observable<any> {
    let headers = this.createAuthorizationHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const body = {
      facebook_id: facebook_id,
      name: first_name,
      surname: last_name,
      email: email,
      dob: dob,
      gender: gender,
      city: city,
      profession: profession,
      mobile_number: mobile,
      profile_image: profile_image
    };

    return this._http.patch(this._url + "profile", body, { headers: headers })
      .pipe(map((res: any) => res));
  }

  getUserInfo(id: number): Observable<any> {
    return this._http.get(this._url + "info/" + id, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  getUserNotifications(): Observable<any> {
    return this._http.get(this._url + "notifications", { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

}
