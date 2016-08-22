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
require('rxjs/add/operator/map');
var http_client_1 = require('../shared/http.client');
var promotion_1 = require('../promotions/promotion');
var PromotionsService = (function () {
    function PromotionsService(_http, _promotion) {
        this._http = _http;
        this._promotion = _promotion;
        this._url = "http://52.37.61.173:8000/api/v1/promotions/promotion";
    }
    PromotionsService.prototype.getPromotions = function (id) {
        return this._http.get(this._url + "/" + id)
            .map(function (res) { return res.json(); });
    };
    PromotionsService.prototype.postPromotion = function () {
        return this._http.post(this._url, JSON.stringify(this._promotion))
            .map(function (res) { return res.json(); });
    };
    PromotionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, promotion_1.Promotion])
    ], PromotionsService);
    return PromotionsService;
}());
exports.PromotionsService = PromotionsService;
//# sourceMappingURL=promotions.service.js.map