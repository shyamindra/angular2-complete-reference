import {Component, OnInit} from '@angular/core';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserService} from './services/user.service';
import {SessionService} from './services/session.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from './shared/user';
import {SideNavDisplay} from './shared/sideNav.component';
import {Widget} from './shared/widget.component';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, NgClass],
    providers: [UserService, SessionService, HTTP_PROVIDERS, FacebookService, SideNavDisplay, Widget]
})
export class AppComponent implements OnInit{
    searchText: string = '';
    showNotifications: boolean = false;
    needsToggle: boolean = false;
    notificationCount: number;
    notifications: string[];
    isUserLoggedIn: boolean = false;
    response: any;
    user: User;

    constructor(private sideNav: SideNavDisplay,
            private widget: Widget,
            private _router: Router, 
            private _cacheService: CacheService, 
            private fb: FacebookService,
            private _sessionService: SessionService,
            private userService: UserService){
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
            console.log(this._cacheService.get('accessTokenRooster'));
            this.userService.getUserNotifications()
                .subscribe(notifications => {
                    console.log(notifications)
                    this.notificationCount = notifications.count;
                    this.notifications = notifications.results as string[];
            });;
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
        this.sideNav.makeActive(path);
    }

    togglePlus(){
        this.widget.togglePlus();
    }

    
    toggleAddButtons(){
        this.widget.toggleAddButtons();
    }

    showPromotionDiv(){
        this.widget.showPromotionDiv();
    }

    showComplaintDiv(){
        this.widget.showComplaintDiv();
    }

    closeWidget(){
        this.widget.closeWidget();
    }

    setActiveFlagsFalse(){
        this.sideNav.setActiveFlagsFalse();
    }

    toggleNotifications(){
        this.needsToggle = !this.needsToggle;
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