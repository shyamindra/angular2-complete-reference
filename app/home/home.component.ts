import {OnInit, Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {RoostService} from '../services/roost-services.service';
import {Feed} from '../shared/feed';

import {HttpClient} from '../shared/http.client';
import {Cache} from '../shared/cache';

import {PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance} from 'ng2-pagination';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export interface PagedResponse<T> {
    total: number;
    data: T[];
}

export interface DataModel {
    id: number;
    data: string;
}

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    directives: [RouterLink, CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [RoostService, HTTP_PROVIDERS, HttpClient, Cache, PaginationService],
    pipes: [PaginatePipe]
})
export class HomeComponent implements OnInit{
    header = "Home Page";
    isLoading = true;
    feeds: Feed[];
    diff: number;
    errorMessage: string;

    private _data: Observable<DataModel[]>;
    private _page: number = 1;
    private _total: number;
    res: any; 

    constructor(private _feedsService: RoostService){
    }
    
   ngOnInit() {
        this.getPage(1);
    }

    getPage(page: number) {
        this._feedsService.getFeeds()
           .then(feeds => {
            this.isLoading = false;
            this.feeds = feeds;
            });
        console.log("feeds -- " + this.feeds);
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
        // this.feeds[index].isShout = !this.feeds[index].isShout;
    }

    toggleListen(index: number){
        // this.feeds[index].isListened = !this.feeds[index].isListened;
    }
    
}