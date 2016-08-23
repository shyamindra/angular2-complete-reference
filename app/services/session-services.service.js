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
var SessionServices = (function () {
    function SessionServices(_http) {
        this._http = _http;
        this._url = "http://52.43.46.127:80/api/session/";
    }
    SessionServices.prototype.getRequestOptions = function (params) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // {'Authorization': 'Token ' + this.authToken});
        // console.log('Authorization'+ ':' + 'Token ' + this.authToken);
        if (null == params) {
            return new http_1.RequestOptions({ headers: headers });
        }
        return new http_1.RequestOptions({ headers: headers, search: params });
    };
    SessionServices.prototype.requestPin = function (mobileNumber) {
        return this._http.post(this._url + "request_pin", JSON.stringify({ mobile_number: mobileNumber }))
            .map(function (res) { return res; });
    };
    SessionServices.prototype.verifyPin = function (mobileNumber, otp) {
        return this._http.post(this._url + "verify_pin", JSON.stringify({ mobile_number: mobileNumber, auth_token: otp }))
            .map(function (res) { return res; });
    };
    SessionServices.prototype.registerUser = function (facebook_id, facebook_token, first_name, last_name, gender, email, dob, profile_image, mobile) {
        return this._http.post(this._url + "register", JSON.stringify({ facebook_id: facebook_id, facebook_token: facebook_token,
            name: first_name, surname: last_name, email: email, dob: dob, gender: gender, mobile_number: mobile }), this.getRequestOptions())
            .map(function (res) { return res.json(); });
    };
    SessionServices.prototype.loginUser = function (facebook_id, facebook_token) {
        console.log(this._http.post(this._url + "register", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token }), this.getRequestOptions()));
        return this._http.post(this._url + "register", JSON.stringify({ facebook_id: facebook_id,
            facebook_token: facebook_token }), this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    SessionServices.prototype.handleError = function (error) {
    };
    SessionServices.prototype.logOutUser = function (auth) {
        return this._http.delete(this._url + "logout")
            .map(function (res) { return res.json(); });
    };
    SessionServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SessionServices);
    return SessionServices;
}());
exports.SessionServices = SessionServices;
//# sourceMappingURL=session-services.service.js.map