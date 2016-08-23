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
var session_services_service_1 = require('../services/session-services.service');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var LoginComponent = (function () {
    function LoginComponent(_router, sessionService) {
        this._router = _router;
        this.sessionService = sessionService;
        FB.init({
            appId: '1720733194853739',
            xfbml: true,
            version: 'v2.7'
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onFacebookLoginClick = function () {
        FB.login();
    };
    LoginComponent.prototype.isUserLoggedIn = function () {
        return this.isLoggedIn;
    };
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        var _this = this;
        console.log(resp);
        if (null != resp) {
            if (resp.status === 'connected') {
                this.sessionService.loginUser(resp.authResponse.userID, resp.authResponse.accessToken)
                    .subscribe(function (res) { return _this.response = res; }, function (error) { return _this.error = error; });
            }
            ;
            console.log(JSON.stringify(this.response) + "--" + JSON.stringify(this.error));
        }
    };
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
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [session_services_service_1.SessionServices, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.Router, session_services_service_1.SessionServices])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map