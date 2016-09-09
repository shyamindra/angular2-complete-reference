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
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const common_1 = require('@angular/common');
const http_1 = require('@angular/http');
const user_service_1 = require('./services/user.service');
const session_service_1 = require('./services/session.service');
const roost_service_1 = require('./services/roost.service');
const ng2_facebook_sdk_1 = require('ng2-facebook-sdk');
const ng2_cache_1 = require('ng2-cache/ng2-cache');
const sideNav_component_1 = require('./shared/sideNav.component');
const widget_component_1 = require('./shared/widget.component');
const roost_1 = require('./shared/roost');
const tag_1 = require('./shared/tag');
const googleplace_directive_1 = require('./shared/googleplace.directive');
const ng2_modal_1 = require('ng2-modal');
let AppComponent = class AppComponent {
    constructor(sideNav, widget, _router, roostService, _cacheService, fb, _sessionService, userService, roost) {
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
        let fbParams = {
            appId: '1682807852004621',
            xfbml: true,
            version: 'v2.5'
        };
        this.fb.init(fbParams);
    }
    ngOnInit() {
        if (null != this._cacheService.get('accessTokenRooster')) {
            this.isUserLoggedIn = true;
            console.log(this._cacheService.get('accessTokenRooster'));
            this.userService.getUserNotifications()
                .subscribe(notifications => {
                console.log(notifications);
                this.notificationCount = notifications.count;
                this.notifications = notifications.results;
            });
            ;
        }
        this._router.navigate(['home']);
        this.sideNav.makeActive('Home');
    }
    onImgUpload(fileInput) {
        this.filesToUpload = fileInput.target.files;
    }
    validatePromotions() {
        if (this.isUserLoggedIn == true) {
            this._router.navigate(['promotions']);
            this.sideNav.makeActive('Promotions');
        }
        else {
            if (this.loginModal != null)
                this.loginModal.open();
        }
    }
    validateComplaints() {
        if (this.isUserLoggedIn == true) {
            this._router.navigate(['complaints']);
            this.sideNav.makeActive('Complaints');
        }
        else {
            if (this.loginModal != null)
                this.loginModal.open();
        }
    }
    handleLogin() {
        this.fb.login().then((response) => {
            this._cacheService.set('userIdFB', response.authResponse.userID);
            this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            this.handleAppLogin();
            ((error) => console.error(error));
        });
    }
    handleAppLogin() {
        this._sessionService.loginUser(this._cacheService.get('userIdFB'), this._cacheService.get('accessTokenFB'))
            .subscribe(response => {
            this.isUserLoggedIn = true;
            console.log(JSON.stringify(response));
            this._cacheService.set('accessTokenRooster', response.token);
            this._cacheService.set('userIdRooster', response.user.id);
            this.firstName = response.user.name;
            this.lastName = response.user.surname;
            this.userImg = response.user.profile_image;
            this._cacheService.set('userFirstName', response.user.name);
            this._cacheService.set('userLastName', response.user.surname);
            this._cacheService.set('userImg', response.user.profile_image);
        });
    }
    triggerSearch(searchTxt) {
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search', searchTxt]);
    }
    makeActive(path) {
        this.sideNav.makeActive(path);
    }
    togglePlus() {
        this.widget.togglePlus();
    }
    toggleAddButtons() {
        this.widget.toggleAddButtons();
    }
    showPromotionDiv() {
        this.widget.showPromotionDiv();
    }
    showComplaintDiv() {
        this.widget.showComplaintDiv();
    }
    closeWidget() {
        this.widget.closeWidget();
    }
    setActiveFlagsFalse() {
        this.sideNav.setActiveFlagsFalse();
    }
    toggleNotifications() {
        this.needsToggle = !this.needsToggle;
        this.userService.getUserNotifications()
            .subscribe(response => {
            console.log(JSON.stringify(response));
        });
    }
    handleOffClick() {
        if (this.needsToggle == true) {
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    }
    submitRoost() {
        this.roost.title = this.complaintTitle;
        this.roost.location = this.complaintLocation;
        this.roost.text = this.complaintDesc;
        this.roost.tags = this.getTags();
        this.roost.type = this.getRoostType();
        console.log(this.roost.roost_media);
        this.roostService.roost(this.roost)
            .subscribe(response => {
            console.log(JSON.stringify(response));
        });
        this.widget.closeWidget();
    }
    getRoostType() {
        return this.widget.roostType;
    }
    getTags() {
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
    }
};
__decorate([
    core_1.ViewChild('loginModal'), 
    __metadata('design:type', ng2_modal_1.Modal)
], AppComponent.prototype, "loginModal", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgStyle, ng2_modal_1.MODAL_DIRECTIVES, googleplace_directive_1.GoogleplaceDirective],
        providers: [user_service_1.UserService, roost_service_1.RoostService, session_service_1.SessionService, http_1.HTTP_PROVIDERS, ng2_facebook_sdk_1.FacebookService, sideNav_component_1.SideNavDisplay, widget_component_1.Widget, roost_1.Roost, ng2_modal_1.Modal]
    }), 
    __metadata('design:paramtypes', [sideNav_component_1.SideNavDisplay, widget_component_1.Widget, router_1.Router, roost_service_1.RoostService, ng2_cache_1.CacheService, (typeof (_a = typeof ng2_facebook_sdk_1.FacebookService !== 'undefined' && ng2_facebook_sdk_1.FacebookService) === 'function' && _a) || Object, session_service_1.SessionService, user_service_1.UserService, roost_1.Roost])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=app.component.js.map