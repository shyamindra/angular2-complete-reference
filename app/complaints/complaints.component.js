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
var complaint_service_1 = require('../services/complaint.service');
var roost_service_1 = require('../services/roost.service');
var config_service_1 = require('../services/config.service');
var complaint_1 = require('./complaint');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var ng2_pagination_1 = require('ng2-pagination');
var ComplaintsComponent = (function () {
    function ComplaintsComponent(_complaintsService, _router, _cacheService, roostService) {
        this._complaintsService = _complaintsService;
        this._router = _router;
        this._cacheService = _cacheService;
        this.roostService = roostService;
        this.header = "Complaints page";
        this.isLoading = true;
        if (null == this._cacheService.get('accessTokenRooster')) {
            this._router.navigate(['home']);
        }
    }
    ComplaintsComponent.prototype.ngOnInit = function () {
        this.pageSize = 50;
        this.getPage();
    };
    ComplaintsComponent.prototype.getPage = function (page) {
        var _this = this;
        this._complaintsService.getAllComplaints(page)
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.total = feeds.count;
            _this.complaints = feeds.results;
            console.log(JSON.stringify(_this.complaints));
            _this.page = null != page ? page : _this.page;
        });
    };
    ComplaintsComponent.prototype.onPageChange = function (page) {
        console.log(page);
        this.getPage(page);
    };
    ComplaintsComponent.prototype.extractDate = function (date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff < 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff < 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    };
    ComplaintsComponent.prototype.redirectToGMaps = function (latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    };
    ComplaintsComponent.prototype.toggleShout = function (index) {
        var _this = this;
        console.log(index);
        this.roostService.shout(this.complaints[index].id)
            .subscribe(function (feeds) {
            console.log(feeds);
            _this.complaints[index].isShout = true;
            _this.complaints[index].shouts = _this.complaints[index].shouts + 1;
            if (_this.complaints[index].isListened == true) {
                _this.complaints[index].isListened = false;
                _this.complaints[index].listeners = _this.complaints[index].listeners - 1;
            }
        });
        ;
    };
    ComplaintsComponent.prototype.toggleListen = function (index) {
        var _this = this;
        console.log(index);
        this.roostService.listen(this.complaints[index].id)
            .subscribe(function (feeds) {
            console.log(feeds);
            _this.complaints[index].isListened = true;
            _this.complaints[index].listeners = _this.complaints[index].listeners + 1;
            if (_this.complaints[index].isShout == true) {
                _this.complaints[index].isShout = false;
                _this.complaints[index].shouts = _this.complaints[index].shouts - 1;
            }
        });
    };
    ComplaintsComponent = __decorate([
        core_1.Component({
            selector: 'complaints',
            templateUrl: 'app/complaints/complaints.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp],
            providers: [complaint_1.Complaint, complaint_service_1.ComplaintsService, config_service_1.ConfigService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService, roost_service_1.RoostService],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [complaint_service_1.ComplaintsService, router_1.Router, ng2_cache_1.CacheService, roost_service_1.RoostService])
    ], ComplaintsComponent);
    return ComplaintsComponent;
}());
exports.ComplaintsComponent = ComplaintsComponent;
//# sourceMappingURL=complaints.component.js.map