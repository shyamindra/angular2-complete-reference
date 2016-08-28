import {OnInit, Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {RoostService} from '../services/roost.service';
import {Feed} from '../shared/feed';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    directives: [RouterLink, CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [RoostService, HTTP_PROVIDERS, PaginationService],
    pipes: [PaginatePipe]
})
export class HomeComponent implements OnInit{
    header = "Home Page";
    isLoading = true;
    feeds: Feed[];
    diff: number;
    padeSize: number;
    page: number;
    total: number;

    constructor(private _feedsService: RoostService){
    }
    
   ngOnInit() {
        this.padeSize = 50;
        this.getPage();    
    }

    getPage(page?: number) {
        this._feedsService.getFeeds(page)
           .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.feeds = feeds.results as Feed[];
            this.page = null != page? page: this.page;
            });
    }

    onPageChange(page: number) {
        console.log(page);
        this.getPage(page);
    }

    playVideo(id: number){
        console.log(id);
    }

    redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
    }
    
    extractDate(date: string) {
        this.diff = (new Date().getTime() - new Date(date).getTime())/1000;
        if(this.diff <= 60)
            return "Just Now";
        else if(this.diff < 3600)
            return Math.round(this.diff/60) + " minutes ago";
        else if(this.diff < 7200)
            return "1 hour ago";
        else if(this.diff <= 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff == 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
    }

    toggleShout(index: number){
        this.feeds[index].isShout = !this.feeds[index].isShout;
    }

    toggleListen(index: number){
        this.feeds[index].isListened = !this.feeds[index].isListened;
    }
    
}