import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, Routes} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserServices} from '../services/user-services.service';
import {RoostService} from '../services/roost-services.service';
import {Cache} from '../shared/cache';
import {HttpClient} from '../shared/http.client';
import {Feed} from '../shared/feed';
import {SearchFilterPipe} from '../shared/search.pipe';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    providers: [UserServices, RoostService, HttpClient, HTTP_PROVIDERS, Cache],
    directives: [CORE_DIRECTIVES],
    pipes: [SearchFilterPipe]
})
export class SearchComponent {
    isLoading: boolean = true;
    searchQry: string;
    errorMessage: string;
    feeds: Feed[];

constructor(private _userService: RoostService){
}

ngOnInit(){
    this._userService.getFeeds()
        .then(feeds => {
            this.isLoading = false;
            this.feeds = feeds;
        },
        error => this.errorMessage);
}

    toggleShout(index: number){
    console.log(index);
    this.feeds[index].isShout = !this.feeds[index].isShout;
}

toggleListen(index: number){
    this.feeds[index].isListened = !this.feeds[index].isListened;
}

}
