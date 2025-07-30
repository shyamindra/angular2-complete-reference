import {Component, OnInit, Output, EventEmitter} from '@angular/core';
declare var $: any;
import {CommonModule} from '@angular/common';
import {Routes, Router, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CacheService} from 'ng2-cache/ng2-cache';
import {NotificationsService} from 'angular2-notifications';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';


import {UserService} from '../services/user.service';
import {User} from '../shared/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [FormBuilder, User, UserService, HttpModule, CommonModule, FormsModule, RouterModule]
})
export class ProfileComponent implements OnInit {

    header = "Profile page";
    response: any;
    fileToUpload: File;
    facebook_id: string;
    date: DateModel;
    options: DatePickerOptions;
    @Output() isChanged = new EventEmitter<boolean>();
    

    constructor(private _userService: UserService, 
        private _cache: CacheService,
        private _router: Router,
        private userProfile: User,
        private _notificationService: NotificationsService){
            if(null == this._cache.get('accessTokenRooster')){
                this._router.navigate(['home']);
            }
            this.options = new DatePickerOptions();
    }

    setIsChanged(){
       this.isChanged.emit(true);
    }

    ngOnInit(){
        if(null != this._cache.get('accessTokenRooster')){
            this.getUserInfo();
        }
    }

    imgChangeEvent(fileInput: any){
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                let profilePic: any = $('#profilePic');
                profilePic.attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.userProfile.profile_image = fileInput.target.files[0];
            // console.log(fileInput.target.files[0]);
            this.savePofilePic(fileInput.target.files[0]);
        }
    }

    getUserInfo(){
        this._userService.getUserInfo(this._cache.get("user").id)
            .subscribe(profile => {
                // console.log(profile);
                this.userProfile.name = profile.name;
                this.userProfile.last_name = profile.surname;
                this.userProfile.email = profile.email;
                this.userProfile.mobile_number = profile.mobile_number;
                this.userProfile.facebook_id = profile.facebook_id;                
                this.facebook_id = this.userProfile.facebook_id;
                this.userProfile.gender = profile.gender;
                this.userProfile.profile_image = profile.profile_image;
                this.userProfile.profession = profile.profession;
                this.userProfile.city = profile.city;
                // console.log(profile.profile_image);
                this.userProfile.dob = profile.dob;
                this.date = new DateModel();
                this.date.formatted = profile.dob;
                // console.log(this.date);               
            });
    }

    savePofilePic(profile_image: any){
        this._userService.updateProfilePic(profile_image)
            .subscribe(profile => {
                // console.log(profile);
            this._notificationService.success('Profile Picture Updated Successfully', '');
            this._cache.set('usrImage', profile.profile_image);
            window.location.reload();
            });
    }

    saveProfile(){
        this._userService.updateProfile(this.userProfile.facebook_id, 
                    this._cache.get("accessTokenFB"), 
                    this.userProfile.name, 
                    this.userProfile.last_name, 
                    this.userProfile.gender, 
                    this.userProfile.email, 
                    this.date.formatted,
                    this.userProfile.city,
                    this.userProfile.profession,
                    this.userProfile.mobile_number)
            .subscribe(profile => {
                // console.log(profile);
                // console.log(this.userProfile.dob.formatted);
                this._cache.set('usrName', this.userProfile.name);
            this._notificationService.success('Profile Updated Successfully', '');
            window.location.reload();
        },
            (err) => {
                console.log(err);
                this._cache.removeAll();
                this._router.navigate['home'];
            });
    }

    parseDate(date: string): string{
        //  console.log(date);
        if(null != date){
            var res: string[] = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0]; 
        }
        return null;
    }

    getDay(date: string): string{
        //  console.log(date);
        if(null != date){
            var res: string[] = date.split("/");
            return res[0]; 
        }
        return null;
    }

    getMonth(date: string): string{
        //  console.log(date);
        if(null != date){
            var res: string[] = date.split("/");
            return res[1]; 
        }
        return null;
    }

    getYear(date: string): string{
        //  console.log(date);
        if(null != date){
            var res: string[] = date.split("/");
            return res[2]; 
        }
        return null;
    }



    reverseDate(date: string): string{
        if(null != date){
            var res: string[] = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0]; 
        }
        return null;
    }


    imgError(img){
        this._userService.getUserInfo(this._cache.get("user").id)
            .subscribe(profile => {
                // console.log(profile);
                this.facebook_id = profile.facebook_id;
                this.userProfile.profile_image = profile.profile_image;
                img.src = this.userProfile.profile_image == null ? this.facebook_id != null ?
                    "https://graph.facebook.com/" +  this.facebook_id + "/picture?type=large" : "/assets/upload.png" : this.userProfile.profile_image;
            });
        // console.log(this.userProfile.facebook_id);
    }


}
