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
require('rxjs/add/operator/map');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var UserService = (function () {
    function UserService(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/user/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    UserService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', this.accessToken);
    };
    UserService.prototype.updateProfile = function (facebook_id, facebook_token, first_name, last_name, gender, email, dob, mobile, profile_image) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.patch(this._url + "profile", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token,
            name: first_name,
            surname: last_name,
            email: email,
            dob: dob,
            gender: gender,
            mobile_number: mobile }), { headers: myHeader })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getUserInfo = function (id) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "info/" + id, { headers: myHeader })
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map