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
var user_service_1 = require('../services/user.service');
var roost_service_1 = require('../services/roost.service');
var ng2_pagination_1 = require('ng2-pagination');
var SearchComponent = (function () {
    function SearchComponent(route, _userService) {
        var _this = this;
        this.route = route;
        this._userService = _userService;
        this.isLoading = true;
        this.sub = this.route.params
            .subscribe(function (params) {
            _this.searchQry = params['searchKey'];
            _this.triggerSearch();
        });
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.pageSize = 50;
    };
    SearchComponent.prototype.triggerSearch = function () {
        var _this = this;
        this._userService.search(this.searchQry)
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.total = feeds.count;
            _this.feeds = feeds.results;
            console.log("feed" + JSON.stringify(feeds));
        }, function (error) { return _this.errorMessage; });
    };
    SearchComponent.prototype.redirectToGMaps = function (latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    };
    SearchComponent.prototype.extractDate = function (date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff <= 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff == 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    };
    SearchComponent.prototype.toggleShout = function (index) {
        var _this = this;
        this._userService.shout(this.feeds[index].id)
            .subscribe(function (feeds) {
            _this.feeds[index].isShout = true;
            _this.feeds[index].shouts = _this.feeds[index].shouts + 1;
            if (_this.feeds[index].isListened == true) {
                _this.feeds[index].isListened = false;
                _this.feeds[index].listeners = _this.feeds[index].listeners - 1;
            }
        });
        ;
    };
    SearchComponent.prototype.toggleListen = function (index) {
        var _this = this;
        this._userService.listen(this.feeds[index].id)
            .subscribe(function (feeds) {
            _this.feeds[index].isListened = true;
            _this.feeds[index].listeners = _this.feeds[index].listeners + 1;
            if (_this.feeds[index].isShout == true) {
                _this.feeds[index].isShout = false;
                _this.feeds[index].shouts = _this.feeds[index].shouts - 1;
            }
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/search/search.component.html',
            directives: [common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp],
            providers: [user_service_1.UserService, roost_service_1.RoostService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, roost_service_1.RoostService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map