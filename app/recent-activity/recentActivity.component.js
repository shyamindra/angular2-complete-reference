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
var roost_services_service_1 = require('../services/roost-services.service');
var sort_pipe_1 = require('../shared/sort.pipe');
var RecentActivityComponent = (function () {
    function RecentActivityComponent(_feedsService, _router) {
        this._feedsService = _feedsService;
        this._router = _router;
        this.header = "Recent Activity Page";
        this.isLoading = true;
        console.log(this.feeds);
    }
    RecentActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._feedsService.getFeeds()
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.feeds = feeds;
        });
    };
    RecentActivityComponent.prototype.redirectToGMaps = function (latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    };
    RecentActivityComponent.prototype.extractDate = function (date) {
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
    RecentActivityComponent.prototype.toggleShout = function (index) {
        console.log(index);
        this.feeds[index].isShout = !this.feeds[index].isShout;
    };
    RecentActivityComponent.prototype.toggleListen = function (index) {
        this.feeds[index].isListened = !this.feeds[index].isListened;
    };
    RecentActivityComponent = __decorate([
        core_1.Component({
            selector: 'recent-activity',
            templateUrl: 'app/recent-activity/recent-activity.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES],
            providers: [roost_services_service_1.RoostService, http_1.HTTP_PROVIDERS],
            pipes: [sort_pipe_1.SortDatePipe]
        }), 
        __metadata('design:paramtypes', [roost_services_service_1.RoostService, router_1.Router])
    ], RecentActivityComponent);
    return RecentActivityComponent;
}());
exports.RecentActivityComponent = RecentActivityComponent;
//# sourceMappingURL=recentActivity.component.js.map