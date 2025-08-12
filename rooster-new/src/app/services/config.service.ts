import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getEnv(key: any): Observable<any> {
    return this.http.get('/app/config/env.json')
      .pipe(map((res: any) => res));
  }

  get(key: any): Observable<any> {
    return this.http.get('/app/config/config.json')
      .pipe(map((res: any) => res));
  }

}
