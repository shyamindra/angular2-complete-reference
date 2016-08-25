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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var UserServices = (function () {
    function UserServices(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/user/";
    }
    UserServices.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', 'Token ' +
            this._cacheService.get('accessTokenRooster'));
        headers.append('Content-Type', 'text/plain');
    };
    UserServices.prototype.updateProfile = function (user) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.patch(this._url + "profile", JSON.stringify(user), options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserServices.prototype.getUserInfo = function (id) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(this._url + "info/" + id);
        console.log(options);
        return this._http.get(this._url + "info/" + id, options)
            .map(function (res) {
            console.log(res),
                function (error) { return console.log(error); },
                function () { return console.log('yay'); };
        });
    };
    UserServices.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    UserServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
    ], UserServices);
    return UserServices;
}());
exports.UserServices = UserServices;
//# sourceMappingURL=user-services.service.js.map