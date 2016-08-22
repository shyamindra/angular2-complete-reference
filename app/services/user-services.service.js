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
require('rxjs/add/operator/map');
var http_client_1 = require('../shared/http.client');
var UserServices = (function () {
    function UserServices(_http) {
        this._http = _http;
        this._url = "http://52.43.46.127:80/api/user/";
    }
    UserServices.prototype.updateProfile = function (user) {
        return this._http.patch(this._url + "profile", JSON.stringify(user))
            .map(function (res) { return res.json(); });
    };
    UserServices.prototype.getUserInfo = function (id) {
        return this._http.get(this._url + "info/" + id)
            .map(function (res) { return res.json(); });
    };
    UserServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_client_1.HttpClient])
    ], UserServices);
    return UserServices;
}());
exports.UserServices = UserServices;
//# sourceMappingURL=user-services.service.js.map