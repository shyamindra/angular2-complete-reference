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
    function HomeComponent(_feedsService) {
        this._feedsService = _feedsService;
        this.header = "Home Page";
        this.isLoading = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.padeSize = 50;
        this.getPage();
    };
    HomeComponent.prototype.getPage = function (page) {
        var _this = this;
        this._feedsService.getFeeds(page)
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.total = feeds.count;
            _this.feeds = feeds.results;
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
        else if (this.diff <= 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff == 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    };
    HomeComponent.prototype.toggleShout = function (index) {
        this.feeds[index].isShout = !this.feeds[index].isShout;
    };
    HomeComponent.prototype.toggleListen = function (index) {
        this.feeds[index].isListened = !this.feeds[index].isListened;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/home/home.component.html',
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