import { Component, ElementRef, Renderer2, Input, HostListener, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { RoostService } from './services/roost.service';
import { User } from './shared/user';
import { SideNav } from './shared/side-nav';
import { Widget } from './shared/widget';
import { Roost } from './shared/roost';
import { Tag } from './shared/tag';
import { GoogleplaceDirective } from './directives/googleplace.directive';

import { FormsModule } from '@angular/forms';

interface Place {
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, GoogleplaceDirective],
  providers: [UserService, RoostService, SessionService, SideNav, Widget, Roost]
})
export class AppComponent implements OnInit {

    isBlur: boolean = false;
    searchText: string = '';
    showNotifications: boolean = false;
    needsToggle: boolean = false;
    notificationCount: number = 0;
    notifications: any[] = [];
    isUserLoggedIn: boolean = false;
    response: any;
    user: User = new User();
    complaintTitle: string = '';
    complaintLocation: string = '';
    tags: string = '';
    complaintDesc: string = '';
    fileToUpload: File | null = null;
    previewVid: any;
    video: any;
    firstName: string = '';
    lastName: string = '';
    userImg: string = '';
    userId: number = 0;
    fileUploadType: string | null = null;
    address : any;
    latitude: any;
    longitude: any;
    title: string = "Please login to continue";
    roostForm: any;
    roostSubmitted: boolean = false;
    mobileNumber: number = 0;

    constructor(public sideNav: SideNav,
            public widget: Widget,
            private _router: Router,
            private roostService: RoostService,
            private _sessionService: SessionService,
            private userService: UserService,
            private roost: Roost,
            private renderer: Renderer2){
        if(localStorage.getItem('accessTokenRooster')){
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.userId = this.user? this.user.id : 0;
            this.userImg = localStorage.getItem('usrImage') || '';
            this.firstName = localStorage.getItem('usrName') || '';
            this.userService.getUserNotifications()
                .subscribe((notifications: any) => {
                    this.notificationCount = notifications.count;
                    this.notifications = notifications.results as any[];
            });
            this.isUserLoggedIn = true;
        }
        this.searchText = '';
    }

    ngOnInit(){
    }

    logout(){
        this._sessionService.logOutUser()
            .subscribe(response => {
                // console.log(response);
            });
        this._router.navigate(['home']);
        this.sideNav.makeActive('Home');
        localStorage.removeItem('user');
        localStorage.removeItem('accessTokenRooster');
        localStorage.clear();
        this.isUserLoggedIn = false;
        window.location.reload();
    }

    imgChangeEvent(fileInput: any){
        this.fileUploadType = 'IMG';
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e : any) => {
                const imgPreview: any = document.getElementById('previewImg');
                imgPreview.src = e.target.result;
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            if(this.fileToUpload && this.fileToUpload.size > 5000000){
                this.fileToUpload = null;
                this.resetForm();
                // TODO: Show a modal instead of an alert
                alert('File size should not exceed 5MB');
            }
        }
    }

    navigate(url: string){
        if(localStorage.getItem('user')){
            this._router.navigate([url.toLowerCase()]);
            this.makeActive(url);
        }
        else{
            this.handleLogin();
        }
    }

    vidChangeEvent(fileInput: any){
        this.fileUploadType = 'VID';
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e : any) => {
                const vidPreview: any = document.getElementById('previewVid');
                vidPreview.src = e.target.result;
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            if(this.fileToUpload && this.fileToUpload.size > 50000000){
                this.fileToUpload = null;
                this.fileUploadType = null;
                this.resetForm();
                const vidPreview: any = document.getElementById('previewVid');
                vidPreview.src = '';
                // TODO: Show a modal instead of an alert
                alert('File size should not exceed 50MB');
            }
            else{
                this.capture();
            }
        }
    }

    capture(){
        const video: any = document.getElementById("previewVid");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0);
            console.log(canvas.toDataURL('image/jpeg'));
        }
    }

    audChangeEvent(fileInput: any){
        this.fileUploadType = 'AUD';
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e : any) => {
                const audPreview: any = document.getElementById('previewAud');
                audPreview.src = e.target.result;
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            if(this.fileToUpload && this.fileToUpload.size > 5000000){
                this.fileToUpload = null;
                this.resetForm();
                // TODO: Show a modal instead of an alert
                alert('File size should not exceed 5MB');
            }
        }
    }

    handleLogin(): void {
        // TODO: Implement a modern modal for login
        alert('Please login to continue');
    }

    triggerSearch(searchTxt: string){
        this.setActiveFlagsFalse();
        this._router.navigate(['search',  searchTxt]);
        this.searchText = "";
    }

    makeActive(path: string){
        this.sideNav.makeActive(path);
        if(this.widget.showWidget == true){
            this.closeWidget();
        }
        else if(this.isBlur == true){
            this.togglePlus();
        }

    }

    togglePlus(){
        this.isBlur = !this.isBlur;
        this.widget.togglePlus();
    }


    toggleAddButtons(){
        this.widget.toggleAddButtons();
    }

    showPromotionDiv(){
        if(localStorage.getItem('user')){
            this.widget.showPromotionDiv();
        }
        else{
            this.handleLogin();
        }
    }

    showComplaintDiv(){
        if(localStorage.getItem('user')){
            this.widget.showComplaintDiv();
        }
        else{
            this.handleLogin();
        }
    }

    closeWidget(){
        this.fileUploadType = null;
        this.isBlur = !this.isBlur;
        this.widget.closeWidget();
        this.resetForm();
    }

    setActiveFlagsFalse(){
        this.sideNav.setActiveFlagsFalse();
    }

    toggleNotifications(){
        this.needsToggle = !this.needsToggle;
        this.userService.getUserNotifications()
            .subscribe(response => {
                // console.log(JSON.stringify(response));
            });
    }

    handleOffClick(){
        if(this.needsToggle == true){
            this.showNotifications = !this.showNotifications;
            this.needsToggle = !this.needsToggle;
            return;
        }
        this.showNotifications = false;
    }

    submitRoost(){
        this.roostSubmitted = true;
        this.roost.title = this.complaintTitle;
        this.roost.location = this.address;
        this.roost.lat = this.latitude;
        this.roost.lng = this.longitude;
        this.roost.text = this.complaintDesc;
        this.roost.tags = this.getTags();
        this.roost.type = this.widget.roostType;
        this.roost.media_type = this.fileUploadType;
        if(this.fileUploadType == 'IMG'){
            this.roost.image = this.fileToUpload;
        }
        else if(this.fileUploadType == 'AUD'){
            this.roost.audio = this.fileToUpload as File;
        }
        else if(this.fileUploadType == 'VID'){
            this.roost.video = this.fileToUpload as File;
        }
        this.roostService.postRoost(this.roost)
            .subscribe((response: any) => {
                this.widget.closeWidget();
                // TODO: Implement a modern notification system
                alert('Successfully Published');
                this.roostSubmitted = false;
                this.isBlur = false;
                this.resetForm();
                if (this.roost.type == 'PROMO') {
                    localStorage.setItem('roostId', response.data.id);
                    this._router.navigate(['payuPayment']);
                }
                else{
                    window.location.reload();
                }
            },
            (err) => {
                console.log(err);
            });
    }

    resetForm(){
        this.complaintDesc = '';
        this.address = '';
        this.complaintTitle = '';
        this.tags = '';
    }

    getTags(){
        if(this.tags){
            return this.tags.split(" ");
        }
        return [];
    }

    imgError(img: any){
        img.src = this.user.facebook_id != null ?
            "https://graph.facebook.com/" + this.user.facebook_id + "/picture?type=large" : "/assets/ab_logo.png";
    }

    countTitleChar() {
        return 100 - (this.complaintTitle?.length || 0);
    };

    countTagChar() {
        return 300 - (this.tags?.length || 0);
    };

    countDescChar() {
        return 1000 - (this.complaintDesc?.length || 0);
    };

    getAddress(place: Place) {
        this.address = place.formatted_address;
        const location = place.geometry.location;
        this.latitude =  location.lat();
        this.longitude = location.lng();
    }

}
