import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, Routes, ActivatedRoute } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserService} from '../services/user.service';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

@Component({
    selector: 'search',
    templateUrl: 'app/shared/rooster.component.html',
    directives: [CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [UserService, RoostService, HTTP_PROVIDERS, PaginationService],
    pipes: [PaginatePipe]
})
export class SearchComponent implements OnInit{
    isLoading: boolean = true;
    searchQry: string;
    errorMessage: string;
    roosts: Roost[];
    sub: any;
    diff: number;
    pageSize: number;
    page: number;
    total: number;

constructor(private route: ActivatedRoute, 
    private _roostService: RoostService,
    private _router: Router){
    this.sub = this.route.params
        .subscribe(params => {
            this.searchQry = params['searchKey'];
            if(null == this.searchQry || this.searchQry == ''){
                this._router.navigate(['home']);
            }
            this.triggerSearch();
    });
}

ngOnInit(){
    this.pageSize = 50;
}

triggerSearch(){
    this._roostService.search(this.searchQry)
        .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            console.log("feed" + JSON.stringify(feeds));
        },
        error => this.errorMessage);
}

redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
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

}
