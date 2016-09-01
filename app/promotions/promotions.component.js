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
var promotion_service_1 = require('../services/promotion.service');
var roost_service_1 = require('../services/roost.service');
var promotion_1 = require('./promotion');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var ng2_pagination_1 = require('ng2-pagination');
var PromotionsComponent = (function () {
    function PromotionsComponent(_promotionsService, router, _cacheService, roostService) {
        this._promotionsService = _promotionsService;
        this.router = router;
        this._cacheService = _cacheService;
        this.roostService = roostService;
        this.header = "Promotions Page";
        this.isLoading = true;
        if (null == this._cacheService.get('accessTokenRooster')) {
            this.router.navigate(['home']);
        }
    }
    PromotionsComponent.prototype.ngOnInit = function () {
        this.pageSize = 50;
        this.getPage();
    };
    PromotionsComponent.prototype.getPage = function (page) {
        var _this = this;
        this._promotionsService.getAllPromotions(page)
            .subscribe(function (feeds) {
            _this.isLoading = false;
            _this.total = feeds.count;
            _this.promotions = feeds.results;
            _this.page = null != page ? page : _this.page;
        });
    };
    PromotionsComponent.prototype.onPageChange = function (page) {
        console.log(page);
        this.getPage(page);
    };
    PromotionsComponent.prototype.extractDate = function (date) {
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
    PromotionsComponent.prototype.redirectToGMaps = function (latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    };
    PromotionsComponent.prototype.toggleShout = function (index) {
        var _this = this;
        console.log(index);
        this.roostService.shout(this.promotions[index].id)
            .subscribe(function (feeds) {
            _this.promotions[index].isShout = true;
            _this.promotions[index].shouts = _this.promotions[index].shouts + 1;
            if (_this.promotions[index].isListened == true) {
                _this.promotions[index].isListened = false;
                _this.promotions[index].listeners = _this.promotions[index].listeners - 1;
            }
        });
        ;
    };
    PromotionsComponent.prototype.toggleListen = function (index) {
        var _this = this;
        console.log(index);
        this.roostService.listen(this.promotions[index].id)
            .subscribe(function (feeds) {
            _this.promotions[index].isListened = true;
            _this.promotions[index].listeners = _this.promotions[index].listeners + 1;
            if (_this.promotions[index].isShout == true) {
                _this.promotions[index].isShout = false;
                _this.promotions[index].shouts = _this.promotions[index].shouts - 1;
            }
        });
    };
    PromotionsComponent = __decorate([
        core_1.Component({
            selector: 'promotions',
            templateUrl: 'app/promotions/promotions.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp],
            providers: [promotion_1.Promotion, promotion_service_1.PromotionsService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService, roost_service_1.RoostService],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [promotion_service_1.PromotionsService, router_1.Router, ng2_cache_1.CacheService, roost_service_1.RoostService])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
exports.PromotionsComponent = PromotionsComponent;
//# sourceMappingURL=promotions.component.js.map