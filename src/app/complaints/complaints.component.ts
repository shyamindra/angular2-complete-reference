import {OnInit, Component} from '@angular/core';
import {RouterLink,Router} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PaginatePipe, Ng2PaginationModule} from 'ng2-pagination';
import {FeedComponent} from '../feed/feed.component';
import {RoostService} from '../services/roost.service';
import {ComplaintService} from '../services/complaint.service';
import {NotificationsService} from 'angular2-notifications';
import {Roost} from '../shared/roost';
import {SessionService} from '../services/session.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';


@Component({
  selector: 'app-complaints',
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['../feed/feed.component.css'],
  providers: [ComplaintService, HttpModule, Ng2PaginationModule, RoostService]
})
export class ComplaintsComponent extends FeedComponent implements OnInit {
  
  header = "Complaints page";
    
    constructor(private _complaintsService: ComplaintService, 
                private cacheService: CacheService,
                private roostService: RoostService,
                private notifyService: NotificationsService,
                private _fb: FacebookService,
                private router: Router, 
                private sessionService: SessionService){
        super(roostService, cacheService, notifyService, _fb, router, sessionService);
    }
    
    ngOnInit(){
        this.pageSize = 50;
        this.getPage();  
    }

    getPage(page?: number) {
        this._complaintsService.getAllComplaints(page)
           .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }


}