import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {SessionServices} from '../services/session-services.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

declare const FB:any;

@Component({
    selector: 'facebook-login',
    template: '',
     directives: [ROUTER_DIRECTIVES],
    providers: [SessionServices, HTTP_PROVIDERS]
})

export class LoginComponent implements OnInit{
    isLoggedIn: boolean;
    response: any;
    error: any;

    constructor(private _router: Router, private sessionService: SessionServices) {
        FB.init({
          appId      : '1720733194853739',
          xfbml      : true,
          version    : 'v2.7'
        });
    }

    ngOnInit(){
    }

    onFacebookLoginClick() {
        FB.login(); 
    }

    isUserLoggedIn(){
      return this.isLoggedIn;
    }

    statusChangeCallback(resp) {
      console.log(resp);
      if(null != resp){
        if (resp.status === 'connected') {
          this.sessionService.loginUser(resp.authResponse.userID, 
                    resp.authResponse.accessToken)
                    .subscribe(
                        res =>      this.response = <any>res,
                        error =>    this.error = <any>error);
        };
        console.log(JSON.stringify(this.response) + "--" + JSON.stringify(this.error));
      }
    }

    login(){
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
        this.onFacebookLoginClick();
    }
}