import {Component, OnInit} from '@angular/core';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {NgClass} from '@angular/common';
import {Cache} from './shared/cache';
import {HTTP_PROVIDERS} from '@angular/http';

import {LoginComponent} from './login/login.component';
import {PostPromotionComponent} from './post/post-promotion.component';
import {PostComplaintComponent} from './post/post-complaint.component';
import {SessionServices} from './services/session-services.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, NgClass],
    providers: [Cache, LoginComponent, SessionServices, HTTP_PROVIDERS]
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
    showNotificationCount: boolean = true;
    isUserLoggedIn: boolean = true;
    showWidget: boolean = false;
    showAddButtons: boolean = false;
    showPlus: boolean = true;
    showPromotion: boolean = false;
    showComplaint: boolean = false;

    postComplaint: PostComplaintComponent;
    postPromotion: PostPromotionComponent;
    
    constructor(private _router: Router, private _cacheService: Cache, private _login: LoginComponent){
        this.isUserLoggedIn = _cacheService.isUserLoggedIn();
    }
    
    ngOnInit(){
        this.isUserLoggedIn = this._cacheService.isUserLoggedIn();
        console.log(this._cacheService.isUserLoggedIn());
    }
    
    handleLogin(){
        // this.isUserLoggedIn = !this.isUserLoggedIn;
        this.setActiveFlagsFalse();
        this._login.login();
        this.isUserLoggedIn = this._login.isUserLoggedIn();
        this.isHome = true;
    }

    triggerSearch(searchTxt: string){
        console.log(searchTxt);
        this.setActiveFlagsFalse();
        this._router.navigate(['search', {searchString : searchTxt}]);
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