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
var roost_service_1 = require('../services/roost.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var ng2_pagination_1 = require('ng2-pagination');
var HomeComponent = (function () {
    function HomeComponent(_roostService) {
        this._roostService = _roostService;
        this.header = "Home Page";
        this.isLoading = true;
        this.displayList = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.pageSize = 50;
        this.getPage();
    };
    HomeComponent.prototype.getPage = function (page) {
        var _this = this;
        this._roostService.getFeeds(page)
            .subscribe(function (feeds) {
            console.log(feeds);
            _this.isLoading = false;
            _this.total = feeds.count;
            _this.roosts = feeds.results;
            _this.page = null != page ? page : _this.page;
        });
    };
    HomeComponent.prototype.onPageChange = function (page) {
        console.log(page);
        this.getPage(page);
    };
    HomeComponent.prototype.playVideo = function (id) {
        console.log(id);
    };
    HomeComponent.prototype.redirectToGMaps = function (latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    };
    HomeComponent.prototype.extractDate = function (date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff < 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff <= 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    };
    HomeComponent.prototype.toggleShout = function (index) {
        var _this = this;
        this._roostService.shout(this.roosts[index].id)
            .subscribe(function (roosts) {
            _this.roosts[index].isShout = true;
            _this.roosts[index].shouts = _this.roosts[index].shouts + 1;
            if (_this.roosts[index].isListened == true) {
                _this.roosts[index].isListened = false;
                _this.roosts[index].listeners = _this.roosts[index].listeners - 1;
            }
        });
    };
    HomeComponent.prototype.toggleListen = function (index) {
        var _this = this;
        this._roostService.listen(this.roosts[index].id)
            .subscribe(function (roosts) {
            _this.roosts[index].isListened = true;
            _this.roosts[index].listeners = _this.roosts[index].listeners + 1;
            if (_this.roosts[index].isShout == true) {
                _this.roosts[index].isShout = false;
                _this.roosts[index].shouts = _this.roosts[index].shouts - 1;
            }
        });
    };
    HomeComponent.prototype.displayShoutsList = function (id) {
        var _this = this;
        this._roostService.listShouts(this.roosts[id].id)
            .subscribe(function (lists) {
            console.log(lists);
            _this.displayList = true;
            _this.lists = lists.results;
            _this.displayListTitle = "Shouts by";
        });
    };
    HomeComponent.prototype.displayListenersList = function (id) {
        var _this = this;
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(function (lists) {
            console.log(JSON.stringify(lists));
            _this.displayList = true;
            _this.lists = lists.results;
            _this.displayListTitle = "Listened by";
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/shared/rooster.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp],
            providers: [roost_service_1.RoostService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [roost_service_1.RoostService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map