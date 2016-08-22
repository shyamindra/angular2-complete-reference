import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Cache} from '../shared/cache';
import {Observable} from 'rxjs/Observable';

declare const FB:any;

@Component({
    selector: 'facebook-login',
    template: '',
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
    isLoggedIn: boolean;

    constructor(private _cacheServ : Cache, private _router: Router) {
        FB.init({
          appId      : '1720733194853739',
          xfbml      : true,
          version    : 'v2.7'
        });
        this._cacheServ = _cacheServ;
    }

    onFacebookLoginClick() {
      if(!this._cacheServ.isUserLoggedIn()){
        FB.login(); 
      }
    }

    isUserLoggedIn(){
      return this.isLoggedIn;
    }

    statusChangeCallback(resp) {
      console.log(resp);
      if(null != resp){
        if (resp.status === 'connected') {
          this._cacheServ.setIsLoggedIn(true);
          this._cacheServ.setToken(resp.authResponse.accessToken);
          this._cacheServ.setUserId(resp.authResponse.userID);
          this.isLoggedIn = true;
        }else if (resp.status === 'not_authorized') {
          this._cacheServ.setIsLoggedIn(false);
        }else {
          this._cacheServ.setIsLoggedIn(false);
        } 
      }
    };
    login(){
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
        this.onFacebookLoginClick();
    }
}