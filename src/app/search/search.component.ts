import {OnInit, Component} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Router, Routes, ActivatedRoute, RouterModule } from '@angular/router';
import {PaginatePipe, Ng2PaginationModule} from 'ng2-pagination';
import {CacheService} from 'ng2-cache/ng2-cache';

import {FeedComponent} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {UserService} from '../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {Roost} from '../shared/roost';

import {SessionService} from '../services/session.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';

@Component({
  selector: 'app-search',
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['../feed/feed.component.css'],
  providers: [UserService, RoostService, HttpModule, RouterModule, Ng2PaginationModule]
})
export class SearchComponent extends FeedComponent implements OnInit {

  searchQry: string;
    errorMessage: string;
    sub: any;

constructor(private route: ActivatedRoute, 
    private roostService: RoostService,
    private cacheService: CacheService,
    private notifyService: NotificationsService,
    private _fb: FacebookService,
    private router: Router, 
    private sessionService: SessionService){
        super(roostService, cacheService, notifyService, _fb, router, sessionService);
        this.sub = this.route.params
            .subscribe(params => {
                this.searchQry = params['searchKey'];
                if(null == this.searchQry || this.searchQry == ''){
                    this.router.navigate(['home']);
                }
                this.triggerSearch();
        });
}

ngOnInit(){
    this.pageSize = 50;
}

triggerSearch(){
    this.roostService.search(this.searchQry)
        .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
        },
        error => this.errorMessage);
}

}