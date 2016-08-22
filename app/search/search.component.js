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
var http_1 = require('@angular/http');
var user_services_service_1 = require('../services/user-services.service');
var roost_services_service_1 = require('../services/roost-services.service');
var cache_1 = require('../shared/cache');
var http_client_1 = require('../shared/http.client');
var search_pipe_1 = require('../shared/search.pipe');
var SearchComponent = (function () {
    function SearchComponent(_userService) {
        this._userService = _userService;
        this.isLoading = true;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getFeeds()
            .then(function (feeds) {
            _this.isLoading = false;
            _this.feeds = feeds;
        }, function (error) { return _this.errorMessage; });
    };
    SearchComponent.prototype.toggleShout = function (index) {
        console.log(index);
        this.feeds[index].isShout = !this.feeds[index].isShout;
    };
    SearchComponent.prototype.toggleListen = function (index) {
        this.feeds[index].isListened = !this.feeds[index].isListened;
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/search/search.component.html',
            providers: [user_services_service_1.UserServices, roost_services_service_1.RoostService, http_client_1.HttpClient, http_1.HTTP_PROVIDERS, cache_1.Cache],
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [search_pipe_1.SearchFilterPipe]
        }), 
        __metadata('design:paramtypes', [roost_services_service_1.RoostService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map