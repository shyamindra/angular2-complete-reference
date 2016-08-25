import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {PromotionsService} from '../services/promotions.service';
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

    constructor(private _promotionsService: PromotionsService){
    }
    
    ngOnInit(){
        this._promotionsService.getAllPromotions()
            .map(promotions => {
                this.isLoading = false;
                this.promotions = promotions.results as Promotion[];
            });
    }

    toggleShout(index: number){
        console.log(index);
        this.promotions[index].isShout = !this.promotions[index].isShout;
    }

    toggleListen(index: number){
        this.promotions[index].isListened = !this.promotions[index].isListened;
    }
}