import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {PromotionsService} from '../services/promotion.service';
import {Promotion} from './promotion';


@Component({
    selector: 'promotions',
    templateUrl: 'app/promotions/promotions.component.html',
    directives: [RouterLink,CORE_DIRECTIVES],
    providers: [Promotion, PromotionsService, HTTP_PROVIDERS]
})
export class PromotionsComponent {
    header = "Promotions Page";
    isLoading = true;
    promotions: Promotion[];
    diff: number;
    padeSize: number;
    total: number;

    constructor(private _promotionsService: PromotionsService){
    }
    
    ngOnInit(){
        this.getFeeds(1);
    }

    getFeeds(page: number){
        this._promotionsService.getAllPromotions()
            .subscribe(promotions => {
                this.isLoading = false;
                this.promotions = promotions.results as Promotion[];
            });
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
        this.promotions[index].isShout = !this.promotions[index].isShout;
    }

    toggleListen(index: number){
        this.promotions[index].isListened = !this.promotions[index].isListened;
    }
}