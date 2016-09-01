import {OnInit, Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

@Component({
    selector: 'home',
    templateUrl: 'app/shared/rooster.component.html',
    directives: [RouterLink, CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [RoostService, HTTP_PROVIDERS, PaginationService],
    pipes: [PaginatePipe]
})
export class HomeComponent implements OnInit{
    header = "Home Page";
    isLoading = true;
    roosts: Roost[];
    diff: number;
    pageSize: number;
    page: number;
    total: number;
    lists: string[];
    displayList: boolean = false;
    displayListTitle: string;

    constructor(private _roostService: RoostService){
    }
    
   ngOnInit() {
        this.pageSize = 50;
        this.getPage();   
    }

    getPage(page?: number) {
        this._roostService.getFeeds(page)
           .subscribe(feeds => {
               console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
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
        else if(this.diff < 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff <= 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
    }

    toggleShout(index: number){
        this._roostService.shout(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isShout = true;
                this.roosts[index].shouts = this.roosts[index].shouts + 1;
                if(this.roosts[index].isListened == true){
                    this.roosts[index].isListened = false;
                    this.roosts[index].listeners = this.roosts[index].listeners - 1;
                }
            });
    }

    toggleListen(index: number){
        this._roostService.listen(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isListened = true;
                this.roosts[index].listeners = this.roosts[index].listeners + 1;
                if(this.roosts[index].isShout == true){
                    this.roosts[index].isShout = false;
                    this.roosts[index].shouts = this.roosts[index].shouts - 1;
                }
            });
    }

    displayShoutsList(id: number){
       this._roostService.listShouts(this.roosts[id].id)
            .subscribe(lists => {
               console.log(lists);
               this.displayList = true;
               this.lists = lists.results;
               this.displayListTitle = "Shouts by";
            });
    }

    displayListenersList(id: number){
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(lists => {
               console.log(JSON.stringify(lists));
               this.displayList = true;
               this.lists = lists.results;
               this.displayListTitle = "Listened by";
            });
    }
    
}