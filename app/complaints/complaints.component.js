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
var complaint_1 = require('./complaint');
var ComplaintsComponent = (function () {
    function ComplaintsComponent(_complaintsService, _router) {
        this._complaintsService = _complaintsService;
        this._router = _router;
        this.header = "Complaints page";
        this.isLoading = true;
    }
    ComplaintsComponent.prototype.ngOnInit = function () {
        this.getFeeds(1);
    };
    ComplaintsComponent.prototype.getFeeds = function (page) {
        var _this = this;
        this._complaintsService.getAllComplaints()
            .subscribe(function (complaints) {
            _this.isLoading = false;
            _this.complaints = complaints.results;
        });
    };
    ComplaintsComponent.prototype.toggleShout = function (index) {
        console.log(index);
        this.complaints[index].isShout = !this.complaints[index].isShout;
    };
    ComplaintsComponent.prototype.toggleListen = function (index) {
        this.complaints[index].isListened = !this.complaints[index].isListened;
    };
    ComplaintsComponent = __decorate([
        core_1.Component({
            selector: 'complaints',
            templateUrl: 'app/complaints/complaints.component.html',
            directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES],
            providers: [complaint_1.Complaint, complaint_service_1.ComplaintsService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [complaint_service_1.ComplaintsService, router_1.Router])
    ], ComplaintsComponent);
    return ComplaintsComponent;
}());
exports.ComplaintsComponent = ComplaintsComponent;
//# sourceMappingURL=complaints.component.js.map