import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { RoostService } from '../services/roost.service';
import { PromotionService } from '../services/promotion.service';
import { Roost } from '../shared/roost';
import { SessionService } from '../services/session.service';
import { HttpClientModule } from '@angular/common/http';

// TODO: Replace ng2-cache, ng2-pagination, angular2-notifications, ng2-facebook-sdk with modern Angular alternatives.

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['../feed/feed.component.css'],
  providers: [PromotionService, RoostService, SessionService]
})
export class PromotionsComponent extends FeedComponent implements OnInit {

  override header = "Promotions page";
    
  constructor(private _promotionService: PromotionService, 
                roostService: RoostService,
                router: Router, 
                sessionService: SessionService){
        super(roostService, router, sessionService);
    }
    
  override ngOnInit(): void {
        this.pageSize = 50;
        this.getPage();  
    }

  override getPage(page?: number): void {
        this._promotionService.getAllPromotions(page)
           .subscribe((feeds: { count: number, results: Roost[] }) => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            });
    }

}
