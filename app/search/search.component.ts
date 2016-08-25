import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, Routes, ActivatedRoute } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserServices} from '../services/user-services.service';
import {RoostService} from '../services/roost-services.service';
import {Feed} from '../shared/feed';
import {SearchFilterPipe} from '../shared/search.pipe';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    providers: [UserServices, RoostService, HTTP_PROVIDERS],
    directives: [CORE_DIRECTIVES],
    pipes: [SearchFilterPipe]
})
export class SearchComponent {
    isLoading: boolean = true;
    searchQry: string;
    errorMessage: string;
    feeds: Feed[];
    sub: any;

constructor(private route: ActivatedRoute, private _userService: RoostService){
    this.sub = this.route.params.subscribe(params => {
        this.searchQry = params['searchKey'];
    }); 
}

ngOnInit(){
    this._userService.search(this.searchQry)
        .subscribe(feeds => {
            this.isLoading = false;
            this.feeds = feeds.results as Feed[];
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
