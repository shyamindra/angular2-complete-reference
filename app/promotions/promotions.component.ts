import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {PromotionsService} from '../services/promotion.service';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import {MODAL_DIRECTIVES} from 'ng2-modal';


@Component({
    selector: 'promotions',
    templateUrl: 'app/shared/rooster.component.html',
    directives: [RouterLink,CORE_DIRECTIVES, PaginationControlsCmp, MODAL_DIRECTIVES],
    providers: [Roost, PromotionsService, HTTP_PROVIDERS, PaginationService, RoostService],
    pipes: [PaginatePipe]
})
export class PromotionsComponent {
    header = "Promotions Page";
    isLoading = true;
    roosts: Roost[];
    diff: number;
    pageSize: number;
    total: number;
    page: number;
    lists: string[];
    displayList: boolean = false;
    displayListTitle: string;

    constructor(private _promotionsService: PromotionsService, 
            private router:Router,
            private _cacheService: CacheService,
            private _roostService: RoostService){
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
            this.roosts = feeds.results as Roost[];
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
        else if(this.diff < 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff <= 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
    }

    redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
    }

     toggleShout(index: number){
        this._roostService.shout(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isShout = true;
                this.roosts[index].shouts = this.roosts[index].shouts + 1;
                if(this.roosts[index].isListened == true){
                    this.roosts[index].isListened = false;
                    this.roosts[index].listeners = this.roosts[index].listeners - 1;
                }
                });;
    }

    toggleListen(index: number){
        this._roostService.listen(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isListened = true;
                this.roosts[index].listeners = this.roosts[index].listeners + 1;
                if(this.roosts[index].isShout == true){
                    this.roosts[index].isShout = false;
                    this.roosts[index].shouts = this.roosts[index].shouts - 1;
                }
                });
    }

    displayShoutsList(id: number){      
       this._roostService.listShouts(this.roosts[id].id)
            .subscribe(lists => {
               console.log(lists);
               this.displayList = true;
               this.lists = lists.results;
               this.displayListTitle = "Shouts by";
            });
    }

    displayListenersList(id: number){
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(lists => {
               console.log(JSON.stringify(lists));
               this.displayList = true;
               this.lists = lists.results;
               this.displayListTitle = "Listened by";
            });
    }
}