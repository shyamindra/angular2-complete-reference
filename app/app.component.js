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
var cache_1 = require('./shared/cache');
var login_component_1 = require('./login/login.component');
var AppComponent = (function () {
    function AppComponent(_router, _cacheService, _login) {
        this._router = _router;
        this._cacheService = _cacheService;
        this._login = _login;
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
        this.showNotificationCount = true;
        this.isUserLoggedIn = true;
        this.showWidget = false;
        this.showAddButtons = false;
        this.showPlus = true;
        this.showPromotion = false;
        this.showComplaint = false;
        this.isUserLoggedIn = _cacheService.isUserLoggedIn();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this._cacheService.isUserLoggedIn();
        console.log(this._cacheService.isUserLoggedIn());
    };
    AppComponent.prototype.handleLogin = function () {
        // this.isUserLoggedIn = !this.isUserLoggedIn;
        this.setActiveFlagsFalse();
        this._login.login();
        this.isUserLoggedIn = this._login.isUserLoggedIn();
        this.isHome = true;
        console.log("this" + this._login.isUserLoggedIn());
        console.log("this" + this._cacheService._isLoggedIn);
        console.log("this" + this._cacheService._userId);
        console.log("this" + this._cacheService._token);
    };
    AppComponent.prototype.triggerSearch = function (searchTxt) {
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search', { searchString: searchTxt }]);
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
    AppComponent.prototype.toggleCross = function () {
        this.showPlus = !this.showPlus;
        this.showComplaint = false;
        this.showPromotion = false;
    };
    AppComponent.prototype.toggleAddButtons = function () {
        this.showAddButtons = !this.showAddButtons;
    };
    AppComponent.prototype.showPromotionDiv = function () {
        this.showPromotion = true;
        this.toggleAddButtons();
    };
    AppComponent.prototype.showComplaintDiv = function () {
        this.showComplaint = true;
        this.toggleAddButtons();
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
            providers: [cache_1.Cache, login_component_1.LoginComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, cache_1.Cache, login_component_1.LoginComponent])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map