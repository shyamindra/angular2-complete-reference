import {Component} from '@angular/core';
import {Routes, Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {UserServices} from '../services/user-services.service';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from '../shared/user';

@Component({
    templateUrl:'app/profile/profile.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserServices, HTTP_PROVIDERS]
})
export class ProfileComponent {
    header = "Profile page";
    response: any;

    constructor(private _userService: UserServices, private _cache: CacheService){

    }


    ngOnInit(){
        this.getUserInfo();
    }

    getUserInfo(){
        console.log(this._userService.getUserInfo(this._cache.get("userIdRooster")));
    }

}