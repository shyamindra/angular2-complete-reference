import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { HttpClientModule } from '@angular/common/http';

// TODO: Replace ng2-cache, angular2-notifications, ng2-datepicker with modern Angular alternatives.

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, User]
})
export class ProfileComponent implements OnInit {

    header: string = "Profile page";
    response: any;
    fileToUpload: File | undefined;
    facebook_id: string | undefined;
    date: string | undefined; // Using string for simplicity, will be replaced by a modern date picker
    @Output() isChanged = new EventEmitter<boolean>();

    constructor(private _userService: UserService, 
        private _router: Router,
        public userProfile: User){
            if(typeof localStorage !== 'undefined' && null == localStorage.getItem('accessTokenRooster')){
                this._router.navigate(['home']);
            }
    }

    public setIsChanged(): void {
       this.isChanged.emit(true);
    }

    public ngOnInit(): void {
        if(typeof localStorage !== 'undefined' && null != localStorage.getItem('accessTokenRooster')){
            this.getUserInfo();
        }
    }

    public imgChangeEvent(fileInput: any){
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e : any) => {
                let profilePic: HTMLImageElement | null = document.getElementById('profilePic') as HTMLImageElement;
                if (profilePic) {
                    profilePic.src = e.target.result;
                }
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.userProfile.profile_image = fileInput.target.files[0];
            this.savePofilePic(fileInput.target.files[0]);
        }
    }

    public getUserInfo(): void {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
            const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
            this._userService.getUserInfo(userId)
                .subscribe(profile => {
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
                    this.userProfile.dob = profile.dob;
                    this.date = profile.dob;
                });
        }
    }

    public savePofilePic(profile_image: any): void {
        this._userService.updateProfilePic(profile_image)
            .subscribe(profile => {
                // TODO: Replace angular2-notifications with a modern notification system
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('usrImage', profile.profile_image);
                }
                window.location.reload();
            });
    }

    public saveProfile(): void {
        this._userService.updateProfile(this.userProfile.facebook_id, 
                    (typeof localStorage !== 'undefined' ? localStorage.getItem('accessTokenFB') : null), 
                    this.userProfile.name, 
                    this.userProfile.last_name, 
                    this.userProfile.gender, 
                    this.userProfile.email, 
                    this.date, // Use this.date directly
                    this.userProfile.city,
                    this.userProfile.profession,
                    this.userProfile.mobile_number)
            .subscribe(profile => {
                // TODO: Replace angular2-notifications with a modern notification system
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('usrName', this.userProfile.name);
                }
                window.location.reload();
            },
            (err) => {
                console.log(err);
                if (typeof localStorage !== 'undefined') {
                    localStorage.clear(); // Use clear() instead of removeAll()
                }
                this._router.navigate(['home']);
            });
    }

    public parseDate(date: string): string{
        if(null != date){
            var res: string[] = date.split("/");
            return res[2] + "-" + res[1] + "-" + res[0]; 
        }
        return "";
    }

    public getDay(date: string): string{
        if(null != date){
            var res: string[] = date.split("/");
            return res[0]; 
        }
        return "";
    }

    public getMonth(date: string): string{
        if(null != date){
            var res: string[] = date.split("/");
            return res[1]; 
        }
        return "";
    }

    public getYear(date: string): string{
        if(null != date){
            var res: string[] = date.split("/");
            return res[2]; 
        }
        return "";
    }

    public reverseDate(date: string): string{
        if(null != date){
            var res: string[] = date.split("-");
            return res[2] + "/" + res[1] + "/" + res[0]; 
        }
        return "";
    }

    public imgError(img: HTMLImageElement): void {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
            const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
            this._userService.getUserInfo(userId)
                .subscribe(profile => {
                    this.facebook_id = profile.facebook_id;
                    this.userProfile.profile_image = profile.profile_image;
                    img.src = this.userProfile.profile_image == null ? this.facebook_id != null ?
                        "https://graph.facebook.com/" +  this.facebook_id + "/picture?type=large" : "/assets/upload.png" : this.userProfile.profile_image;
                });
        }
    }

}
