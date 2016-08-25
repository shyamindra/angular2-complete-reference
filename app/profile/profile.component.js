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
var http_1 = require('@angular/http');
var user_services_service_1 = require('../services/user-services.service');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var ProfileComponent = (function () {
    function ProfileComponent(_userService, _cache) {
        this._userService = _userService;
        this._cache = _cache;
        this.header = "Profile page";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserInfo();
    };
    ProfileComponent.prototype.getUserInfo = function () {
        console.log(this._userService.getUserInfo(this._cache.get("userIdRooster")));
    };
    ProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/profile/profile.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_services_service_1.UserServices, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [user_services_service_1.UserServices, ng2_cache_1.CacheService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map