import {Component,Pipe} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {RoostService} from '../services/roost-services.service';
import {Feed} from '../shared/feed';

import {SortDatePipe} from '../shared/sort.pipe';

@Component({
    selector: 'recent-activity',
    templateUrl: 'app/recent-activity/recent-activity.component.html',
    directives: [RouterLink,CORE_DIRECTIVES],
    providers: [RoostService, HTTP_PROVIDERS],
    pipes: [SortDatePipe]
})
export class RecentActivityComponent {
    header = "Recent Activity Page";
    isLoading = true;
    feeds: Feed[];
    diff: number;

    constructor(private _feedsService: RoostService, private _router: Router){
        console.log(this.feeds);
    }
    
    ngOnInit(){
        this._feedsService.getFeeds()
            .subscribe(feeds => {
                this.isLoading = false;
                this.feeds = feeds;
            });
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
        console.log(index);
        this.feeds[index].isShout = !this.feeds[index].isShout;
    }

    toggleListen(index: number){
        this.feeds[index].isListened = !this.feeds[index].isListened;
    }
    
}