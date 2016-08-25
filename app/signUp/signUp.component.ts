import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import { MdRadioModule } from '@angular2-material/radio';
import {User} from '../shared/user';
import {SessionServices} from '../services/session-services.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


declare const FB:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'app/signUp/facebook-register.html',
    directives: [MdToolbar, MD_INPUT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: [FormBuilder, User, SessionServices, HTTP_PROVIDERS]
})

export class SignUpComponent implements OnInit {

    name: string;
    first_name: string;
    dob: string;
    form: FormGroup;
    response: any;
    signUp: boolean;
  
    constructor(fb: FormBuilder, private sessionService: SessionServices, private user: User) {
        this.form = fb.group({
            email: ["", Validators.required]
        });
        FB.init({
          appId      : '1720733194853739',
          xfbml      : true,
          version    : 'v2.7'
        });
    }

    ngOnInit() {
    }
    
    onFacebookSignUpClick() {
        this.signUp = true;
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }

    statusChangeCallback(resp) {
      console.log(resp);
        if (resp.status == 'connected') {
            if(this.signUp == true){
                this.sessionService.registerUser(resp.authResponse.userID, 
                    resp.authResponse.accessToken, 
                    this.user.first_name, 
                    this.user.last_name, 
                    this.user.gender, 
                    this.user.email, 
                    this.parseDate(this.user.dob))
                .subscribe(res => {
                    this.response = res;
                });
            console.log(this.response);
            }
        }
    };

    parseDate(date: string){
        if(null != date){
            var res: string[] = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0]; 
        }
    }
}