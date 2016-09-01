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
var ng2_modal_1 = require('ng2-modal');
var sort_pipe_1 = require('../shared/sort.pipe');
var RecentActivityComponent = (function () {
    function RecentActivityComponent(_roostService, _router) {
        this._roostService = _roostService;
        this._router = _router;
        this.header = "Recent Activity Page";
        this.isLoading = true;
        this.displayList = false;
        console.log(this.roosts);
    }
    RecentActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._roostService.getFeeds()
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.roosts = feeds;
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
        else if (this.diff <= 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    };
    RecentActivityComponent.prototype.toggleShout = function (index) {
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
        ;
    };
    RecentActivityComponent.prototype.toggleListen = function (index) {
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
    RecentActivityComponent.prototype.displayShoutsList = function (id) {
        var _this = this;
        this._roostService.listShouts(this.roosts[id].id)
            .subscribe(function (lists) {
            console.log(lists);
            _this.displayList = true;
            _this.lists = lists.results;
            _this.displayListTitle = "Shouts by";
        });
    };
    RecentActivityComponent.prototype.displayListenersList = function (id) {
        var _this = this;
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(function (lists) {
            console.log(JSON.stringify(lists));
            _this.displayList = true;
            _this.lists = lists.results;
            _this.displayListTitle = "Listened by";
        });
    };
    RecentActivityComponent = __decorate([
        core_1.Component({
            selector: 'recent-activity',
            templateUrl: 'app/shared/rooster.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_modal_1.MODAL_DIRECTIVES],
            providers: [roost_service_1.RoostService, http_1.HTTP_PROVIDERS],
            pipes: [sort_pipe_1.SortDatePipe]
        }), 
        __metadata('design:paramtypes', [roost_service_1.RoostService, router_1.Router])
    ], RecentActivityComponent);
    return RecentActivityComponent;
}());
exports.RecentActivityComponent = RecentActivityComponent;
//# sourceMappingURL=recentActivity.component.js.map