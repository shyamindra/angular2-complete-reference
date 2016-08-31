import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS, Headers} from '@angular/http';
import {ComplaintsService} from '../services/complaint.service';
import {RoostService} from '../services/roost.service';
import {ConfigService} from '../services/config.service';
import {Complaint} from './complaint';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

@Component({
    selector: 'complaints',
    templateUrl: 'app/complaints/complaints.component.html',
    directives: [RouterLink,CORE_DIRECTIVES, PaginationControlsCmp],
    providers: [Complaint, ComplaintsService, ConfigService, HTTP_PROVIDERS, PaginationService, RoostService],
    pipes: [PaginatePipe]
})
export class ComplaintsComponent {
    header = "Complaints page";
    isLoading = true;
    complaints: Complaint[];
    diff: number;
    pageSize: number;
    page: number;
    total: number;

    constructor(private _complaintsService: ComplaintsService, 
                private _router: Router,
                private _cacheService: CacheService,
                private roostService: RoostService){
        if(null == this._cacheService.get('accessTokenRooster')){
            this._router.navigate(['home']);
        }
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
            this.complaints = feeds.results as Complaint[];
            console.log(JSON.stringify(this.complaints));
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
        this.roostService.shout(this.complaints[index].id)
            .subscribe(feeds => {
                console.log(feeds);
                this.complaints[index].isShout = true;
                this.complaints[index].shouts = this.complaints[index].shouts + 1;
                if(this.complaints[index].isListened == true){
                    this.complaints[index].isListened = false;
                    this.complaints[index].listeners = this.complaints[index].listeners - 1;
                }
                });;
    }

    toggleListen(index: number){
        console.log(index);
        this.roostService.listen(this.complaints[index].id)
            .subscribe(feeds => {
                console.log(feeds);
                this.complaints[index].isListened = true;
                this.complaints[index].listeners = this.complaints[index].listeners + 1;
                if(this.complaints[index].isShout == true){
                    this.complaints[index].isShout = false;
                    this.complaints[index].shouts = this.complaints[index].shouts - 1;
                }
                });
    }

}