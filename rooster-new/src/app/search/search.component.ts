import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { RoostService } from '../services/roost.service';
import { UserService } from '../services/user.service';
import { Roost } from '../shared/roost';
import { SessionService } from '../services/session.service';
import { HttpClientModule } from '@angular/common/http';

// TODO: Replace ng2-cache, ng2-pagination, angular2-notifications, ng2-facebook-sdk with modern Angular alternatives.

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: '../feed/feed.component.html',
  styleUrls: ['../feed/feed.component.css'],
  providers: [UserService, RoostService, SessionService]
})
export class SearchComponent extends FeedComponent implements OnInit {

  override searchQry: string = '';
  errorMessage: string = '';
  override roosts: any[] = []; // Placeholder for roosts
  override isLoading: boolean = false;
  override total: number = 0;
  override pageSize: number = 50;
  private sub: any; // Declare sub property

  constructor(private route: ActivatedRoute, 
    private roostService: RoostService,
    private router: Router, 
    private sessionService: SessionService){
        super(roostService, router, sessionService);
        this.sub = this.route.params
            .subscribe(params => {
                this.searchQry = params['searchKey'];
                if(null == this.searchQry || this.searchQry == ''){
                    this.router.navigate(['home']);
                }
                this.triggerSearch();
        });
}

  override ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQry = params['searchKey'];
      if (null == this.searchQry || this.searchQry === '') {
        this.router.navigate(['home']);
      }
      this.triggerSearch();
    });
  }

  public triggerSearch(): void {
    this.isLoading = true;
    this.roostService.search(this.searchQry)
        .subscribe((feeds: { count: number, results: Roost[] }) => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
        },
        (error: any) => this.errorMessage = error);
  }

}
