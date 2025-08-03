import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



import { Roost } from '../shared/roost';

@Injectable({
  providedIn: 'root'
})
export class RoostService {
  private _url = "http://52.43.46.127:80/api/roost";
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

  activate(deal: number): Observable<any> {
    let headers = this.createAuthorizationHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._http.patch(`${this._url}/activate/`, { deal: deal }, { headers: headers })
      .pipe(map((res: any) => res));
  }

  getFeeds(page?: number): Observable<any> {
    let url = `${this._url}/feeds/`;
    if (null != page) {
      url += `?page=${page}`;
    }
    return this._http.get(url, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  getFeed(id: number): Observable<any> {
    const url = `${this._url}/${id}`;
    return this._http.get(url, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  search(key: string, page?: string): Observable<any> {
    let url = `${this._url}/search/${key}/`;
    if (null != page) {
      url += `?page=${page}`;
    }
    return this._http.get(url, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  shout(id: number): Observable<any> {
    let headers = this.createAuthorizationHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._http.post(`${this._url}/shout/`, { roost: id }, { headers: headers })
      .pipe(map((res: any) => res));
  }

  listen(id: number): Observable<any> {
    let headers = this.createAuthorizationHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._http.post(`${this._url}/listen/`, { roost: id }, { headers: headers })
      .pipe(map((res: any) => res));
  }

  comment(id: number, comment: string): Observable<any> {
    let headers = this.createAuthorizationHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this._http.post(`${this._url}/comment/`, { roost: id, comment: comment }, { headers: headers })
      .pipe(map((res: any) => res));
  }

  listListeners(id: number): Observable<any> {
    return this._http.get(`${this._url}/list_listeners/${id}`, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  listShouts(id: number): Observable<any> {
    return this._http.get(`${this._url}/list_shouts/${id}/`, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  listComments(id: number): Observable<any> {
    return this._http.get(`${this._url}/comments/${id}/`, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  leave(id: number): Observable<any> {
    return this._http.delete(`${this._url}/leave/${id}/`, { headers: this.createAuthorizationHeaders() })
      .pipe(map((res: any) => res));
  }

  postRoost(feed: Roost): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("title", feed.title);
    formData.append("text", feed.text);
    formData.append("location", feed.location);
    formData.append("lat", feed.lat.toString());
    formData.append("lng", feed.lng.toString());
    if (feed.media_type) {
      formData.append("media_type", feed.media_type);
    }
    if (feed.media_type === 'IMG' && feed.image) {
      formData.append("image", feed.image);
    } else if (feed.media_type === 'AUD' && feed.audio) {
      formData.append("audio", feed.audio);
    } else if (feed.media_type === 'VID' && feed.video) {
      formData.append("video", feed.video);
    }
    formData.append("type", feed.type);
    formData.append("tags", feed.tags);

    let headers = this.createAuthorizationHeaders();
    // HttpClient automatically sets Content-Type for FormData, so no need to set it manually
    // headers = headers.set('Content-Type', 'multipart/form-data'); // Do NOT set this manually

    return this._http.post(this._url, formData, { headers: headers })
      .pipe(map((res: any) => res));
  }

}
