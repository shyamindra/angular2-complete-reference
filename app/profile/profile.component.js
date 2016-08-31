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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var input_1 = require('@angular2-material/input');
var toolbar_1 = require('@angular2-material/toolbar');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var user_service_1 = require('../services/user.service');
var user_1 = require('../shared/user');
var ProfileComponent = (function () {
    function ProfileComponent(_userService, _cache, _router, user) {
        this._userService = _userService;
        this._cache = _cache;
        this._router = _router;
        this.user = user;
        this.header = "Profile page";
        if (null == this._cache.get('accessTokenRooster')) {
            this._router.navigate(['home']);
        }
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserInfo();
    };
    ProfileComponent.prototype.getUserInfo = function () {
        var _this = this;
        this._userService.getUserInfo(this._cache.get("userIdRooster"))
            .subscribe(function (profile) {
            console.log(profile);
            _this.user.first_name = profile.name;
            _this.user.last_name = profile.surname;
            _this.user.email = profile.email;
            _this.user.mobile_number = profile.mobile_number;
            _this.user.facebook_id = profile.facebook_id;
            _this.user.gender = profile.gender;
            _this.user.profile_image = profile.profile_image;
            _this.user.dob = _this.reverseDate(profile.dob);
        });
    };
    ProfileComponent.prototype.saveProfile = function () {
        this._userService.updateProfile(this._cache.get("userIdFB"), this._cache.get("accessTokenFB"), this.user.first_name, this.user.last_name, this.user.gender, this.user.email, this.parseDate(this.user.dob), this.user.mobile_number)
            .subscribe(function (profile) {
            console.log(profile);
        });
    };
    ProfileComponent.prototype.parseDate = function (date) {
        if (null != date) {
            var res = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0];
        }
    };
    ProfileComponent.prototype.reverseDate = function (date) {
        if (null != date) {
            var res = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0];
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/profile/profile.html',
            directives: [toolbar_1.MdToolbar, input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [forms_1.FormBuilder, user_1.User, user_service_1.UserService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, ng2_cache_1.CacheService, router_1.Router, user_1.User])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map