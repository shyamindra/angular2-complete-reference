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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var session_services_service_1 = require('./services/session-services.service');
var ng2_facebook_sdk_1 = require('ng2-facebook-sdk');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var AppComponent = (function () {
    function AppComponent(_router, _cacheService, fb, _sessionService) {
        this._router = _router;
        this._cacheService = _cacheService;
        this.fb = fb;
        this._sessionService = _sessionService;
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isPayment = false;
        this.isRecentActivity = false;
        this.searchText = '';
        this.showNotifications = false;
        this.needsToggle = false;
        this.showNotificationCount = false;
        this.isUserLoggedIn = false;
        this.showWidget = false;
        this.showAddButtons = false;
        this.showPlus = true;
        this.showPromotion = false;
        this.showComplaint = false;
        var fbParams = {
            appId: '1720733194853739',
            xfbml: true,
            version: 'v2.7'
        };
        this.fb.init(fbParams);
    }
    AppComponent.prototype.ngOnInit = function () {
        if (null != this._cacheService.get('accessTokenRooster')) {
            this.isUserLoggedIn = true;
        }
    };
    AppComponent.prototype.handleLogin = function () {
        var _this = this;
        this.fb.login().then(function (response) {
            _this._cacheService.set('userIdFB', response.authResponse.userID);
            _this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            _this.handleAppLogin();
            (function (error) { return console.error(error); });
        });
    };
    AppComponent.prototype.handleAppLogin = function () {
        var _this = this;
        this._sessionService.loginUser(this._cacheService.get('userIdFB'), this._cacheService.get('accessTokenFB'))
            .subscribe(function (response) {
            _this.isUserLoggedIn = true;
            console.log(JSON.stringify(response));
            _this._cacheService.set('accessTokenRooster', response.token);
            _this._cacheService.set('userIdRooster', response.user.id);
        });
    };
    AppComponent.prototype.triggerSearch = function (searchTxt) {
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search', searchTxt]);
    };
    AppComponent.prototype.makeActive = function (path) {
        this.setActiveFlagsFalse();
        switch (path) {
            case 'Home':
                this.isHome = true;
                break;
            case 'Profile':
                this.isProfile = true;
                break;
            case 'Complaints':
                this.isComplaints = true;
                break;
            case 'Promotions':
                this.isPromotions = true;
                break;
            case 'Payment':
                this.isPayment = true;
                break;
            case 'RecentActivity':
                this.isRecentActivity = true;
                break;
        }
    };
    AppComponent.prototype.togglePlus = function () {
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    };
    AppComponent.prototype.toggleAddButtons = function () {
        this.showAddButtons = !this.showAddButtons;
    };
    AppComponent.prototype.showPromotionDiv = function () {
        this.showPromotion = true;
        this.togglePlus();
    };
    AppComponent.prototype.showComplaintDiv = function () {
        this.showComplaint = true;
        this.togglePlus();
    };
    AppComponent.prototype.setActiveFlagsFalse = function () {
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isRecentActivity = false;
        this.isPayment = false;
    };
    AppComponent.prototype.showWidgetDiv = function () {
        this.showWidget = true;
    };
    AppComponent.prototype.toggleNotifications = function () {
        this.needsToggle = !this.needsToggle;
        this.showNotificationCount = false;
    };
    AppComponent.prototype.handleOffClick = function () {
        if (this.needsToggle == true) {
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass],
            providers: [session_services_service_1.SessionServices, http_1.HTTP_PROVIDERS, ng2_facebook_sdk_1.FacebookService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_cache_1.CacheService, (typeof (_a = typeof ng2_facebook_sdk_1.FacebookService !== 'undefined' && ng2_facebook_sdk_1.FacebookService) === 'function' && _a) || Object, session_services_service_1.SessionServices])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map