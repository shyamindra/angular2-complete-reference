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
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const router_1 = require('@angular/router');
const http_1 = require('@angular/http');
const roost_service_1 = require('../services/roost.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
const ng2_pagination_1 = require('ng2-pagination');
const ng2_modal_1 = require('ng2-modal');
let HomeComponent = class HomeComponent {
    constructor(_roostService, myModal) {
        this._roostService = _roostService;
        this.myModal = myModal;
        this.header = "Home Page";
        this.isLoading = true;
        this.displayList = false;
    }
    ngOnInit() {
        this.pageSize = 50;
        this.getPage();
    }
    getPage(page) {
        this._roostService.getFeeds(page)
            .subscribe(feeds => {
            console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
            this.page = null != page ? page : this.page;
        });
    }
    onPageChange(page) {
        console.log(page);
        this.getPage(page);
    }
    playVideo(id) {
        console.log(id);
    }
    redirectToGMaps(latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    }
    extractDate(date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff < 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff <= 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    }
    toggleShout(index) {
        this._roostService.shout(this.roosts[index].id)
            .subscribe(roosts => {
            this.roosts[index].isShout = true;
            this.roosts[index].shouts = this.roosts[index].shouts + 1;
            if (this.roosts[index].isListened == true) {
                this.roosts[index].isListened = false;
                this.roosts[index].listeners = this.roosts[index].listeners - 1;
            }
            this.myModal.open();
        });
    }
    toggleListen(index) {
        this._roostService.listen(this.roosts[index].id)
            .subscribe(roosts => {
            this.roosts[index].isListened = true;
            this.roosts[index].listeners = this.roosts[index].listeners + 1;
            if (this.roosts[index].isShout == true) {
                this.roosts[index].isShout = false;
                this.roosts[index].shouts = this.roosts[index].shouts - 1;
            }
            this.myModal.open();
        });
    }
    displayShoutsList(id) {
        this._roostService.listShouts(this.roosts[id].id)
            .subscribe(lists => {
            console.log(lists);
            this.displayList = true;
            this.lists = lists.results;
            this.displayListTitle = "Shouts by";
        });
    }
    displayListenersList(id) {
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(lists => {
            console.log(JSON.stringify(lists));
            this.displayList = true;
            this.lists = lists.results;
            this.displayListTitle = "Listened by";
        });
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'app/shared/rooster.component.html',
        directives: [router_1.RouterLink, common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp, ng2_modal_1.MODAL_DIRECTIVES],
        providers: [roost_service_1.RoostService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService, ng2_modal_1.Modal],
        pipes: [ng2_pagination_1.PaginatePipe]
    }), 
    __metadata('design:paramtypes', [roost_service_1.RoostService, ng2_modal_1.Modal])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map