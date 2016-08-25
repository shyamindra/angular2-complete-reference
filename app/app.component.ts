import {Component, OnInit} from '@angular/core';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

import {PostPromotionComponent} from './post/post-promotion.component';
import {PostComplaintComponent} from './post/post-complaint.component';
import {SessionServices} from './services/session-services.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from './shared/user';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, NgClass],
    providers: [SessionServices, HTTP_PROVIDERS, FacebookService]
})
export class AppComponent implements OnInit{
    isHome: boolean = false;
    isProfile: boolean = false;
    isComplaints: boolean = false;
    isPromotions: boolean = false;
    isSettings: boolean = false;
    isPayment: boolean = false;
    isRecentActivity: boolean = false;
    searchText: string = '';
    showNotifications: boolean = false;
    needsToggle: boolean = false;
    showNotificationCount: boolean = false;
    isUserLoggedIn: boolean = false;
    showWidget: boolean = false;
    showAddButtons: boolean = false;
    showPlus: boolean = true;
    showPromotion: boolean = false;
    showComplaint: boolean = false;
    response: any;
    user: User;

    postComplaint: PostComplaintComponent;
    postPromotion: PostPromotionComponent;

    constructor(private _router: Router, 
            private _cacheService: CacheService, 
            private fb: FacebookService,
            private _sessionService: SessionServices){
        let fbParams: FacebookInitParams = {
                        appId: '1720733194853739',
                        xfbml: true,
                        version: 'v2.7'
                        };
        this.fb.init(fbParams);
    }
    
    ngOnInit(){
        if(null != this._cacheService.get('accessTokenRooster')){
            this.isUserLoggedIn = true;
        }
    }
    

    handleLogin(): void {
        this.fb.login().then(
        (response: FacebookLoginResponse) => {
            this._cacheService.set('userIdFB', response.authResponse.userID);
            this._cacheService.set('accessTokenFB', response.authResponse.accessToken);
            this.handleAppLogin();
            (error: any) => console.error(error)
        });
    }

    handleAppLogin(): void{
        this._sessionService.loginUser(
            this._cacheService.get('userIdFB'), 
            this._cacheService.get('accessTokenFB'))
            .subscribe(response => {
                this.isUserLoggedIn = true;
                console.log(JSON.stringify(response));
                this._cacheService.set('accessTokenRooster', response.token);
                this._cacheService.set('userIdRooster', response.user.id);
            });
    }


    triggerSearch(searchTxt: string){
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search',  searchTxt]);
    }
    
    makeActive(path: string){
        this.setActiveFlagsFalse();
        switch(path){
            case 'Home': 
                this.isHome = true;
                break; 
            case 'Profile': 
                this.isProfile = true;
                break;
            case 'Complaints': 
                this.isComplaints = true;
                break;
            case 'Promotions': 
                this.isPromotions = true;
                break;
            case 'Payment': 
                this.isPayment = true;
                break;
            case 'RecentActivity': 
                this.isRecentActivity = true;
                break;
        }
    }

    togglePlus(){
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    }

    
    toggleAddButtons(){
        this.showAddButtons = !this.showAddButtons;
    }

    showPromotionDiv(){
        this.showPromotion = true;
        this.togglePlus();
    }

    showComplaintDiv(){
        this.showComplaint = true;
        this.togglePlus();
    }

    setActiveFlagsFalse(){
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isRecentActivity = false;
        this.isPayment = false;
    }

    showWidgetDiv(){
        this.showWidget = true;
    }

    toggleNotifications(){
        this.needsToggle = !this.needsToggle;
        this.showNotificationCount = false;
    }

    handleOffClick(){
        if(this.needsToggle == true){
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    }
}