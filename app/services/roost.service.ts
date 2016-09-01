import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CacheService} from 'ng2-cache/ng2-cache';

import {Feed} from '../shared/feed';
import {User} from '../shared/user';

@Injectable()
export class RoostService {
    private _url = "http://52.43.46.127:80/api/roost";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster')
    }
    
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.accessToken); 
    }
    
    getFeeds(page?: number): Observable<any>  {
        var url = this._url + "/feeds/";
        if(null != page)
            url += "?page=" + page;
        return this._http.get(url)
            .map((res: Response) => res.json());
    }

    search(key: string, page?: string): Observable<any>{
        var url = this._url + "/search/" + key + "/";
        if(null != page)
            url += "?page=" + page; 
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        console.log(url + "---" + key);
        return this._http.get(url, {headers: myHeader})
            .map((res: Response) => res.json());
    }

    shout(id: number): Observable<any>{
        console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/shout/", JSON.stringify({roost: id}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    listen(id: number): Observable<any>{
        console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/listen/", JSON.stringify({roost: id}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    roost(feed: Feed): Observable<any>{
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        console.log(JSON.stringify({
                title: feed.title,
                text: feed.text,
                location: feed.location,
                lat: feed.lat,
                lng: feed.lng,
                roost_media: feed.roost_media,
                media_type: feed.media_type,
                type: feed.type,
                tags: feed.tags
            }));
        return this._http.post(this._url, JSON.stringify({
                title: feed.title,
                text: feed.text,
                location: feed.location,
                lat: feed.lat,
                lng: feed.lng,
                roost_media: feed.roost_media,
                media_type: feed.media_type,
                type: feed.type,
                tags: feed.tags
            }), {headers: myHeader})
            .map((res: Response) => res.json(),
                (err) => console.log(err));
    }
    
}