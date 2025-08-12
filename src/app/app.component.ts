import { Component, ElementRef, Renderer, Input, HostListener, HostBinding, OnInit, ViewChild } from '@angular/core';
import {Routes, Router, RouterModule} from '@angular/router';
import {NgClass, NgStyle} from '@angular/common';
import {HttpModule} from '@angular/http';
declare var $: any;

import {UserService} from './services/user.service';
import {SessionService} from './services/session.service';
import {RoostService} from './services/roost.service';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from './shared/user';
import {SideNav} from './shared/side-nav';
import {Widget} from './shared/widget';
import {Roost} from './shared/roost';
import {Tag} from './shared/tag';

import {ModalModule, Modal } from 'ng2-modal';

import {FormGroup, FormsModule} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, RoostService, SessionService, HttpModule,
        FacebookService, SideNav, Widget, Roost, Modal, FormsModule]
})
export class AppComponent {

    isBlur: boolean = false;
    searchText: string = '';
    showNotifications: boolean = false;
    needsToggle: boolean = false;
    notificationCount: number;
    notifications: string[];
    isUserLoggedIn: boolean = false;
    response: any;
    user: User;
    complaintTitle: string;
    complaintLocation: string;
    tags: string;
    complaintDesc: string;
    fileToUpload: File;
    previewVid: any;
    video: any;
    firstName: string;
    lastName: string;
    userImg: string;
    userId: number;
    fileUploadType: string;
    address : any;
    latitude: any;
    longitude: any;
    title: string = "Please login to continue";
    roostForm;
    roostSubmitted: boolean = false;
    mobileNumber: number;
    @ViewChild('loginModal')
    loginModal: Modal;
    @ViewChild('logoutModal')
    logoutModal: Modal;
    @ViewChild('mobileLoginModal')
    mobileLoginModal: Modal;
    @ViewChild('otpModal')
    otpModal: Modal;
    @ViewChild('fileUploadModal')
    fileUploadModal: Modal;


    options = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: "visible",
        rtl: false,
        animate: "scale",
        position: ["right", "bottom"]
    };


    constructor(private sideNav: SideNav,
            private widget: Widget,
            private _router: Router,
            private roostService: RoostService,
            private _cacheService: CacheService,
            private fb: FacebookService,
            private _sessionService: SessionService,
            private userService: UserService,
            private roost: Roost,
            private _service: NotificationsService){
        let fbParams: FacebookInitParams = {
                        appId: '1821385414813530',
                        xfbml: true,
                        version: 'v2.5'
                        };
        this.fb.init(fbParams);
        if(null != this._cacheService.get('accessTokenRooster')){
            this.user = this._cacheService.get('user');
            this.userId = null != this.user? this.user.id : null;
            this.userImg = null != this._cacheService.get('usrImage') ? this._cacheService.get('usrImage') : null;
            this.firstName = null != this._cacheService.get('usrName') ? this._cacheService.get('usrName') : null;
            this.userService.getUserNotifications()
                .subscribe(notifications => {
                    this.notificationCount = notifications.count;
                    this.notifications = notifications.results as string[];
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
        this._cacheService.remove('user');
        this._cacheService.remove('accessTokenRooster');
        this._cacheService.removeAll();
        this.isUserLoggedIn = false;
        window.location.reload();
    }

    imgChangeEvent(fileInput: any){
        this.fileUploadType = 'IMG';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                let imgPreview: any = $('#previewImg');
                imgPreview.attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            if(this.fileToUpload.size > 5000000){
                this.fileToUpload = null;
                this.resetForm();
                this.fileUploadModal.open();
            }
        }
    }

    navigate(url: string){
        if(this._cacheService.get('user') != null){
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
            var reader = new FileReader();
            reader.onload = function (e : any) {
                let vidPreview: any = $('#previewVid');
                vidPreview.attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            // console.log(this.previewVid.duration);
            if(this.fileToUpload.size > 50000000){
                this.fileToUpload = null;
                this.fileUploadType = null;
                this.resetForm();
                let vidPreview: any = $('#previewVid');
                vidPreview.attr('src', '');
                this.fileUploadModal.open();
            }
            else{
                this.capture();
            }
        }
    }

    capture(){
        var video: any = $("#previewVid").get(0);
        console.log(video);
        var canvas = document.createElement('canvas');
        console.log(canvas);
        var ctx = canvas.getContext('2d');
        console.log(ctx);
        ctx.drawImage(video, 0, 0);
        console.log(canvas.toDataURL('image/jpeg'));
    }

    audChangeEvent(fileInput: any){
        this.fileUploadType = 'AUD';
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e : any) {
                let audPreview: any = $('#previewAud');
                audPreview.attr('src', e.target.result);
            }

            reader.readAsDataURL(fileInput.target.files[0]);
            this.fileToUpload = fileInput.target.files[0];
            if(this.fileToUpload.size > 5000000){
                this.fileToUpload = null;
                this.resetForm();
                this.fileUploadModal.open();
            }
            // console.log(this.fileToUpload.size);
        }
    }

    handleLogin(): void {
        this.loginModal.open();
    }

    facebookLogin(){
        this.loginModal.close();
        this.handleFacebookLogin();
    }

    loginMobile(){
        this.loginModal.close();
        this.mobileLoginModal.open();
    }

    mobileLogin(mobile: number){
        // console.log(mobile);
        this._sessionService.requestPin(mobile)
            .subscribe(response => {
                // console.log(response);
                this.mobileNumber = mobile;
                // console.log(mobile);
                // console.log(this.mobileNumber)
                this.mobileLoginModal.close();
                this.otpModal.open();
            })

    }

    validateOtp(otp: number){
        // console.log(otp);
        this._sessionService.verifyPin(this.mobileNumber, otp)
            .subscribe(response => {
                    // console.log(response);
                    // console.log(response.json());
                    this._cacheService.set('accessTokenRooster', response.json().data.token);
                    // console.log(this._cacheService.get('accessTokenRooster'));
                    // console.log(response.json().data.user);
                    this.firstName = response.json().data.user.name;
                    this.lastName = response.json().data.user.surname;
                    this.userImg = response.json().data.user.profile_image;
                    this._cacheService.set('user', response.json().data.user);
                    this._cacheService.set('usrName', response.json().data.user.name);
                    this._cacheService.set('usrImage', response.json().data.user.profile_image);
                    this.isUserLoggedIn = true;
                    this.otpModal.close();
                    window.location.reload();
            },
            (err) => {
                console.log(err);
                this._cacheService.removeAll();
                this._router.navigate['home'];
            })
    }

    verifyPin(mobile: string, pin: number){
        this._sessionService.loginMobileUser(mobile)
            .subscribe(response => {
                this._cacheService.set('accessTokenRooster', response.token);
                // console.log(this._cacheService.get('accessTokenRooster'));
                // console.log(response);
                this.firstName = response.user.name;
                this.lastName = response.user.surname;
                this.userImg = response.user.profile_image;
                this._cacheService.set('user', response.user);
                this.isUserLoggedIn = true;
                window.location.reload();
            },
            (err) => {
                console.log(err);
                this._cacheService.removeAll();
                this._router.navigate['home'];
            });
    }

    handleFacebookLogin(){
        this.fb.login().then(
        (response: FacebookLoginResponse) => {
            this.handleAppLogin(response.authResponse.userID, response.authResponse.accessToken);
            // console.log(response);
        },
        (error: any) => console.error(error));
    }

    handleAppLogin(userId: string, accessToken: string): void{
        this._sessionService.loginUser(
            userId, accessToken)
            .subscribe(response => {
                this._cacheService.set('accessTokenRooster', response.token);
                // console.log(this._cacheService.get('accessTokenRooster'));
                // console.log(response);
                this.firstName = response.user.name;
                // console.log(this.firstName);
                this.lastName = response.user.surname;
                this.userImg = response.user.profile_image;
                this._cacheService.set('user', response.user);
                this._cacheService.set('usrName', response.user.name);
                this._cacheService.set('usrImage', response.user.profile_image);
                this.isUserLoggedIn = true;
                window.location.reload();
            },
            (err) => {
                console.log(err);
                this._cacheService.removeAll();
                this._router.navigate['home'];
            });
    }

    getAddress(place:Object) {
           this.address = place['formatted_address'];
           var location = place['geometry']['location'];
           this.latitude =  location.lat();
           this.longitude = location.lng();
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
        if(this._cacheService.get('user') != null){
            this.widget.showPromotionDiv();
        }
        else{
            this.handleLogin();
        }
    }

    showComplaintDiv(){
        if(this._cacheService.get('user') != null){
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
        // console.log(this.widget.roostType);
        this.roost.media_type = this.fileUploadType;
        if(this.fileUploadType == 'IMG'){
            this.roost.image = this.fileToUpload;
        }
        else if(this.fileUploadType == 'AUD'){
            this.roost.audio = this.fileToUpload;
        }
        else if(this.fileUploadType == 'VID'){
            this.roost.video = this.fileToUpload;
        }
        // console.log(this.roost);
        this.roostService.postRoost(this.roost)
            .subscribe(response => {
                // console.log(response);
                this.widget.closeWidget();
                this._service.success('Successfully Published', '');
                this.roostSubmitted = false;
                this.isBlur = false;
                this.resetForm();
                if (this.roost.type == 'PROMO') {
                    // console.log(response.data.id);
                    this._cacheService.set('roostId', response.data.id);
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
        if(null != this.tags){
            var res: string[] = this.tags.split(" ");
            // console.log(res.length);
            var tags = new Array<string>();
            for(var i =0; i <res.length; i++){
                tags.push(res[i]);
            }
            return tags;
        }
    }

    imgError(img){
        // console.log(img);
        img.src = this.user.facebook_id != null ?
            "https://graph.facebook.com/" + this.user.facebook_id + "/picture?type=large" : "/assets/ab_logo.png";
        // console.log(img.src);
    }

    countTitleChar() {
        var len = null != this.complaintTitle ? this.complaintTitle.length : 0;
        var txt = '(' + (100 - len) + '/100)'
        $('#titleCharCount').text(txt);
    };

    countTagChar() {
        var len = null != this.tags ? this.tags.length : 0;
        var txt = '(' + (300 - len) + '/300)'
        $('#tagCharCount').text(txt);
    };

    countDescChar() {
        var len = null != this.complaintDesc ? this.complaintDesc.length : 0;
        var txt = '(' + (1000 - len) + '/1000)'
        $('#descCharCount').text(txt);
    };

}
