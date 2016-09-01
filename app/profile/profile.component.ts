import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {CacheService} from 'ng2-cache/ng2-cache';

import {UserService} from '../services/user.service';
import {User} from '../shared/user';


@Component({
    templateUrl:'app/profile/profile.html',
    directives: [MdToolbar, MD_INPUT_DIRECTIVES, CORE_DIRECTIVES, 
        FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: [FormBuilder, User, UserService, HTTP_PROVIDERS]
})
export class ProfileComponent implements OnInit{
    header = "Profile page";
    response: any;

    constructor(private _userService: UserService, 
        private _cache: CacheService,
        private _router: Router,
        private userProfile: User){
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
                this.userProfile.first_name = profile.name;
                this.userProfile.last_name = profile.surname;
                this.userProfile.email = profile.email;
                this.userProfile.mobile_number = profile.mobile_number;
                this.userProfile.facebook_id = profile.facebook_id;                
                this.userProfile.gender = profile.gender;
                this.userProfile.profile_image = profile.profile_image;
                this.userProfile.dob = this.reverseDate(profile.dob);               
            });
    }

    saveProfile(){
        this._userService.updateProfile(this._cache.get("userIdFB"), 
                    this._cache.get("accessTokenFB"), 
                    this.userProfile.first_name, 
                    this.userProfile.last_name, 
                    this.userProfile.gender, 
                    this.userProfile.email, 
                    this.parseDate(this.userProfile.dob),
                    this.userProfile.mobile_number)
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