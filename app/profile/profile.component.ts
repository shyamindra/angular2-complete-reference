import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {CacheService} from 'ng2-cache/ng2-cache';

import {UserService} from '../services/user.service';
import {User} from '../shared/user';


@Component({
    templateUrl:'app/profile/profile.html',
    directives: [MdToolbar, MD_INPUT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: [FormBuilder, User, UserService, HTTP_PROVIDERS]
})
export class ProfileComponent {
    header = "Profile page";
    response: any;

    constructor(private _userService: UserService, 
        private _cache: CacheService,
        private _router: Router,
        private user: User){
            if(null == this._cache.get('accessTokenRooster')){
                this._router.navigate(['home']);
            }
    }


    ngOnInit(){
        this.getUserInfo();
    }

    getUserInfo(){
        this._userService.getUserInfo(this._cache.get("userIdRooster"))
            .subscribe(profile => {
                console.log(profile);
                this.user.first_name = profile.name;
                this.user.last_name = profile.surname;
                this.user.email = profile.email;
                this.user.mobile_number = profile.mobile_number;
                this.user.facebook_id = profile.facebook_id;                
                this.user.gender = profile.gender;
                this.user.profile_image = profile.profile_image;
                this.user.dob = this.reverseDate(profile.dob);               
            });
    }

    saveProfile(){
        console.log(this.user.gender);
         console.log(this._cache.get("userIdFB")); 
                     console.log(this._cache.get("accessTokenFB")); 
                     console.log(this.user.first_name); 
                     console.log(this.user.last_name); 
                     console.log(this.user.gender); 
                     console.log(this.user.email); 
                     console.log(this.parseDate(this.user.dob));
                     console.log(this.user.mobile_number);
                     console.log(this._cache.get("accessTokenRooster"))
        this._userService.updateProfile(this._cache.get("userIdFB"), 
                    this._cache.get("accessTokenFB"), 
                    this.user.first_name, 
                    this.user.last_name, 
                    this.user.gender, 
                    this.user.email, 
                    this.parseDate(this.user.dob),
                    this.user.mobile_number)
            .subscribe(profile => {
                console.log(profile)});
    }

     parseDate(date: string){
        if(null != date){
            var res: string[] = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0]; 
        }
    }

    reverseDate(date: string){
        if(null != date){
            var res: string[] = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0]; 
        }
    }


}