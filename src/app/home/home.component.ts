import {OnInit, Component} from '@angular/core';
import {PaginatePipe, Ng2PaginationModule} from 'ng2-pagination';
import {CacheService} from 'ng2-cache/ng2-cache';
import {FeedComponent} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';
import {NotificationsService} from 'angular2-notifications';
import {RouterModule,Router,ActivatedRoute} from '@angular/router';
import {SessionService} from '../services/session.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {isNullOrUndefined, isUndefined} from "util";

@Component({
  selector: 'app-home',
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['../feed/feed.component.css'],
  providers: [RoostService, Ng2PaginationModule]
})
export class HomeComponent extends FeedComponent implements OnInit {

    header = "Home Page";
    sub: any;
    roostId: string;

    constructor(private route: ActivatedRoute,
            private roostService: RoostService,
            private cacheService: CacheService,
            private notifyService: NotificationsService,
            private _fb: FacebookService,
            private router: Router,
            private sessionService: SessionService){
        super(roostService, cacheService, notifyService, _fb, router, sessionService);
        // console.log(this.route);
        this.sub = this.route.queryParams
        .subscribe(params => {
            this.roostId = params['ct'];
            // console.log(params['ct']);
            // console.log("I am the roost Id" +this.roostId);
            if (isUndefined(this.roostId) == false) {
              if (null == this.roostId || this.roostId == '') {
                // console.log("I am the roost repeated" + this.roostId);
                this.router.navigate(['home']);
              }
              else {
                this.getRoostById(Number(this.roostId));
                if (this.isUserLoggedIn) {
                  this.router.navigate(['home']);
                }
              }
            }
    });
    }

    ngOnInit(){
        this.pageSize = 50;
        this.getPage();
    }

    getPage(page?: number) {
        this.roostService.getFeeds(page)
           .subscribe(feeds => {
              //  console.log(feeds);
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }
}
