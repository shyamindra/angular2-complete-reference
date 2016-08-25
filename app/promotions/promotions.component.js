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
var promotions_service_1 = require('../services/promotions.service');
var promotion_1 = require('./promotion');
var PromotionsComponent = (function () {
    function PromotionsComponent(_promotionsService) {
        this._promotionsService = _promotionsService;
        this.header = "Promotions Page";
        this.isLoading = true;
    }
    PromotionsComponent.prototype.ngOnInit = function () {
        this.getFeeds(1);
    };
    PromotionsComponent.prototype.getFeeds = function (page) {
        var _this = this;
        this._promotionsService.getAllPromotions()
            .subscribe(function (promotions) {
            _this.isLoading = false;
            _this.promotions = promotions.results;
        });
    };
    PromotionsComponent.prototype.extractDate = function (date) {
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
    PromotionsComponent.prototype.toggleShout = function (index) {
        console.log(index);
        this.promotions[index].isShout = !this.promotions[index].isShout;
    };
    PromotionsComponent.prototype.toggleListen = function (index) {
        this.promotions[index].isListened = !this.promotions[index].isListened;
    };
    PromotionsComponent = __decorate([
        core_1.Component({
            selector: 'promotions',
            templateUrl: 'app/promotions/promotions.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES],
            providers: [promotion_1.Promotion, promotions_service_1.PromotionsService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [promotions_service_1.PromotionsService])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
exports.PromotionsComponent = PromotionsComponent;
//# sourceMappingURL=promotions.component.js.map