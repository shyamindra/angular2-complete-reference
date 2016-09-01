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
var user_service_1 = require('./services/user.service');
var session_service_1 = require('./services/session.service');
var roost_service_1 = require('./services/roost.service');
var ng2_facebook_sdk_1 = require('ng2-facebook-sdk');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var sideNav_component_1 = require('./shared/sideNav.component');
var widget_component_1 = require('./shared/widget.component');
var roost_1 = require('./shared/roost');
var tag_1 = require('./shared/tag');
var AppComponent = (function () {
    function AppComponent(sideNav, widget, _router, roostService, _cacheService, fb, _sessionService, userService, roost) {
        this.sideNav = sideNav;
        this.widget = widget;
        this._router = _router;
        this.roostService = roostService;
        this._cacheService = _cacheService;
        this.fb = fb;
        this._sessionService = _sessionService;
        this.userService = userService;
        this.roost = roost;
        this.searchText = '';
        this.showNotifications = false;
        this.needsToggle = false;
        this.isUserLoggedIn = false;
        var fbParams = {
            appId: '1720733194853739',
            xfbml: true,
            version: 'v2.7'
        };
        this.fb.init(fbParams);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (null != this._cacheService.get('accessTokenRooster')) {
            this.isUserLoggedIn = true;
            console.log(this._cacheService.get('accessTokenRooster'));
            this.userService.getUserNotifications()
                .subscribe(function (notifications) {
                console.log(notifications);
                _this.notificationCount = notifications.count;
                _this.notifications = notifications.results;
            });
            ;
        }
    };
    AppComponent.prototype.onImgUpload = function ($event) {
        this.filesToUpload = img.target.files;
    };
    AppComponent.prototype.onVideoUpload = function ($event) {
        this.filesToUpload = fileInput.target.files;
    };
    AppComponent.prototype.onAudioUpload = function ($event) {
        this.filesToUpload = fileInput.target.files;
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
        this.sideNav.makeActive(path);
    };
    AppComponent.prototype.togglePlus = function () {
        this.widget.togglePlus();
    };
    AppComponent.prototype.toggleAddButtons = function () {
        this.widget.toggleAddButtons();
    };
    AppComponent.prototype.showPromotionDiv = function () {
        this.widget.showPromotionDiv();
    };
    AppComponent.prototype.showComplaintDiv = function () {
        this.widget.showComplaintDiv();
    };
    AppComponent.prototype.closeWidget = function () {
        this.widget.closeWidget();
    };
    AppComponent.prototype.setActiveFlagsFalse = function () {
        this.sideNav.setActiveFlagsFalse();
    };
    AppComponent.prototype.toggleNotifications = function () {
        this.needsToggle = !this.needsToggle;
    };
    AppComponent.prototype.handleOffClick = function () {
        if (this.needsToggle == true) {
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    };
    AppComponent.prototype.submitRoost = function () {
        this.roost.title = this.complaintTitle;
        this.roost.location = this.complaintLocation;
        this.roost.text = this.complaintDesc;
        this.roost.tags = this.getTags();
        this.roost.type = this.getRoostType();
        console.log(this.roost.roost_media);
        this.roostService.roost(this.roost)
            .subscribe(function (response) {
            console.log(JSON.stringify(response));
        });
        this.widget.closeWidget();
    };
    AppComponent.prototype.getRoostType = function () {
        return this.widget.roostType;
    };
    AppComponent.prototype.getTags = function () {
        var res = this.tags.split(" ");
        console.log(res.length);
        var tags = new Array();
        for (var i = 0; i < res.length; i++) {
            var t = new tag_1.Tag();
            t.id = i;
            t.tag = res[i];
            tags.push(t);
        }
        return tags;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgStyle],
            providers: [user_service_1.UserService, roost_service_1.RoostService, session_service_1.SessionService, http_1.HTTP_PROVIDERS, ng2_facebook_sdk_1.FacebookService, sideNav_component_1.SideNavDisplay, widget_component_1.Widget, roost_1.Roost]
        }), 
        __metadata('design:paramtypes', [sideNav_component_1.SideNavDisplay, widget_component_1.Widget, router_1.Router, roost_service_1.RoostService, ng2_cache_1.CacheService, (typeof (_a = typeof ng2_facebook_sdk_1.FacebookService !== 'undefined' && ng2_facebook_sdk_1.FacebookService) === 'function' && _a) || Object, session_service_1.SessionService, user_service_1.UserService, roost_1.Roost])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map