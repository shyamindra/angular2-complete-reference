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
var http_client_1 = require('../shared/http.client');
var cache_1 = require('../shared/cache');
var PromotionsComponent = (function () {
    function PromotionsComponent(_promotionsService, _router) {
        this._promotionsService = _promotionsService;
        this._router = _router;
        this.header = "Promotions Page";
        this.isLoading = true;
        console.log(this.promotions);
    }
    PromotionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._promotionsService.getPromotions("all")
            .subscribe(function (promotions) {
            _this.isLoading = false;
            _this.promotions = promotions;
        });
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
            providers: [promotion_1.Promotion, promotions_service_1.PromotionsService, http_1.HTTP_PROVIDERS, http_client_1.HttpClient, cache_1.Cache]
        }), 
        __metadata('design:paramtypes', [promotions_service_1.PromotionsService, router_1.Router])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
exports.PromotionsComponent = PromotionsComponent;
//# sourceMappingURL=promotions.component.js.map