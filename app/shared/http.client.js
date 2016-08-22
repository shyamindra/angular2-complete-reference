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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var cache_1 = require('../shared/cache');
var HttpClient = (function () {
    function HttpClient(http, cache) {
        this.http = http;
        if (cache.isUserLoggedIn())
            this.authToken = cache.getToken();
    }
    HttpClient.prototype.getRequestOptions = function (params) {
        var headers = new http_1.Headers({ 'Authorization': 'Token ' + this.authToken });
        console.log('Authorization' + ':' + 'Token ' + this.authToken);
        if (null == params) {
            return new http_1.RequestOptions({ headers: headers });
        }
        return new http_1.RequestOptions({ headers: headers, search: params });
    };
    HttpClient.prototype.get = function (url, params) {
        if (null == params) {
            return this.http.get(url, this.getRequestOptions())
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
            ;
        }
        return this.http.get(url, this.getRequestOptions(params))
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        ;
    };
    HttpClient.prototype.post = function (url, data) {
        return this.http.post(url, data, this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HttpClient.prototype.patch = function (url, data) {
        return this.http.patch(url, data, this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        ;
    };
    HttpClient.prototype.delete = function (url) {
        return this.http.delete(url, this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        ;
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, cache_1.Cache])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.client.js.map