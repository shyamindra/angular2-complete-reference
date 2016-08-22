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
var router_1 = require('@angular/router');
var cache_1 = require('../shared/cache');
var LoginComponent = (function () {
    function LoginComponent(_cacheServ, _router) {
        this._cacheServ = _cacheServ;
        this._router = _router;
        FB.init({
            appId: '1720733194853739',
            xfbml: true,
            version: 'v2.7'
        });
        this._cacheServ = _cacheServ;
    }
    LoginComponent.prototype.onFacebookLoginClick = function () {
        if (!this._cacheServ.isUserLoggedIn()) {
            FB.login();
        }
    };
    LoginComponent.prototype.isUserLoggedIn = function () {
        return this.isLoggedIn;
    };
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        console.log(resp);
        if (null != resp) {
            if (resp.status === 'connected') {
                this._cacheServ.setIsLoggedIn(true);
                this._cacheServ.setToken(resp.authResponse.accessToken);
                this._cacheServ.setUserId(resp.authResponse.userID);
                this.isLoggedIn = true;
            }
            else if (resp.status === 'not_authorized') {
                this._cacheServ.setIsLoggedIn(false);
            }
            else {
                this._cacheServ.setIsLoggedIn(false);
            }
        }
    };
    ;
    LoginComponent.prototype.login = function () {
        var _this = this;
        FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        });
        this.onFacebookLoginClick();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'facebook-login',
            template: '',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [cache_1.Cache, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map