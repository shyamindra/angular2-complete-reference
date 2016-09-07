"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/map');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
let RoostService = class RoostService {
    constructor(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/roost";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    createAuthorizationHeader(headers) {
        headers.append('Authorization', this.accessToken);
    }
    getFeeds(page) {
        var url = this._url + "/feeds/";
        if (null != page)
            url += "?page=" + page;
        return this._http.get(url)
            .map((res) => res.json());
    }
    search(key, page) {
        var url = this._url + "/search/" + key + "/";
        if (null != page)
            url += "?page=" + page;
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        console.log(url + "---" + key);
        return this._http.get(url, { headers: myHeader })
            .map((res) => res.json());
    }
    shout(id) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/shout/", JSON.stringify({ roost: id }), { headers: myHeader })
            .map((res) => res.json());
    }
    listen(id) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/listen/", JSON.stringify({ roost: id }), { headers: myHeader })
            .map((res) => res.json());
    }
    comment(id, comment) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/comment/", JSON.stringify({ roost: id, comment: comment }), { headers: myHeader })
            .map((res) => res.json());
    }
    listListeners(id) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/list_listeners/" + id, { headers: myHeader })
            .map((res) => res.json());
    }
    listShouts(id) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/list_shouts/" + id + "/", { headers: myHeader })
            .map((res) => res.json());
    }
    listComments(id) {
        console.log(id);
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/comments/" + id + "/", { headers: myHeader })
            .map((res) => res.json());
    }
    roost(feed) {
        console.log(JSON.stringify(feed.roost_media));
        var myHeader = new http_1.Headers();
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
        }), { headers: myHeader })
            .map((res) => res.json(), (err) => console.log(err));
    }
};
RoostService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
], RoostService);
exports.RoostService = RoostService;
//# sourceMappingURL=roost.service.js.map