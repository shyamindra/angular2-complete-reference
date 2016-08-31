import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, Routes, ActivatedRoute } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserService} from '../services/user.service';
import {RoostService} from '../services/roost.service';
import {Feed} from '../shared/feed';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    directives: [CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [UserService, RoostService, HTTP_PROVIDERS, PaginationService],
    pipes: [PaginatePipe]
})
export class SearchComponent implements OnInit{
    isLoading: boolean = true;
    searchQry: string;
    errorMessage: string;
    feeds: Feed[];
    sub: any;
    diff: number;
    pageSize: number;
    page: number;
    total: number;

constructor(private route: ActivatedRoute, private _userService: RoostService){
    this.sub = this.route.params
        .subscribe(params => {
            this.searchQry = params['searchKey'];
            this.triggerSearch();
    });
}

ngOnInit(){
    this.pageSize = 50;
}

triggerSearch(){
    this._userService.search(this.searchQry)
        .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.feeds = feeds.results as Feed[];
            console.log("feed" + JSON.stringify(feeds));
        },
        error => this.errorMessage);
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
        this._userService.shout(this.feeds[index].id)
            .subscribe(feeds => {
                this.feeds[index].isShout = true;
                this.feeds[index].shouts = this.feeds[index].shouts + 1;
                if(this.feeds[index].isListened == true){
                    this.feeds[index].isListened = false;
                    this.feeds[index].listeners = this.feeds[index].listeners - 1;
                }
                });;
    }

    toggleListen(index: number){
        this._userService.listen(this.feeds[index].id)
            .subscribe(feeds => {
                this.feeds[index].isListened = true;
                this.feeds[index].listeners = this.feeds[index].listeners + 1;
                if(this.feeds[index].isShout == true){
                    this.feeds[index].isShout = false;
                    this.feeds[index].shouts = this.feeds[index].shouts - 1;
                }
                });
    }

}
