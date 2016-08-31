import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {PromotionsService} from '../services/promotion.service';
import {Promotion} from './promotion';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';


@Component({
    selector: 'promotions',
    templateUrl: 'app/promotions/promotions.component.html',
    directives: [RouterLink,CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [Promotion, PromotionsService, HTTP_PROVIDERS, PaginationService],
    pipes: [PaginatePipe]
})
export class PromotionsComponent {
    header = "Promotions Page";
    isLoading = true;
    promotions: Promotion[];
    diff: number;
    pageSize: number;
    total: number;
    page: number;

    constructor(private _promotionsService: PromotionsService, 
            private router:Router,
            private _cacheService: CacheService){
        if(null == this._cacheService.get('accessTokenRooster')){
            this.router.navigate(['home']);
        }
    }
    
    ngOnInit(){
        this.pageSize = 50;
        this.getPage();
    }

    getPage(page?: number) {
        this._promotionsService.getAllPromotions(page)
           .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.promotions = feeds.results as Promotion[];
            this.page = null != page? page: this.page;
            });
    }

    onPageChange(page: number) {
        console.log(page);
        this.getPage(page);
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

    redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
    }

    toggleShout(index: number){
        console.log(index);
        this.promotions[index].isShout = !this.promotions[index].isShout;
    }

    toggleListen(index: number){
        this.promotions[index].isListened = !this.promotions[index].isListened;
    }
}