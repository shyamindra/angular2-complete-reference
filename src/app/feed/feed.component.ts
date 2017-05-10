import {OnInit, Component, ViewChild, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule,Router} from '@angular/router';
import {HttpModule} from '@angular/http';
import {RoostService} from '../services/roost.service';
import {SessionService} from '../services/session.service';
import {CacheService} from 'ng2-cache/ng2-cache';
import {Roost} from '../shared/roost';
import {User} from '../shared/user';
import {FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookUiParams} from 'ng2-facebook-sdk';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {PaginatePipe, Ng2PaginationModule, PaginationService} from 'ng2-pagination';
import {ModalModule, Modal} from 'ng2-modal';
import {NotificationsService} from 'angular2-notifications';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [RoostService, HttpModule, RouterModule, Ng2PaginationModule, ModalModule, Modal]
})
export class FeedComponent implements OnInit {

  header = "Home Page";
    isLoading = true;
    roosts: Roost[];
    diff: number;
    pageSize: number;
    page: number;
    total: number;
    lists: any;
    displayList: boolean = false;
    displayListTitle: string;
    @ViewChild('myModal')
    myModal: Modal;
    @ViewChild('commentsModal')
    commentsModal: Modal;
    @ViewChild('detailModal')
    detailModal: Modal;
    @ViewChild('loginModal')
    loginModal: Modal;
    @ViewChild('mediaModal')
    mediaModal: Modal;
    @ViewChild('alertModal')
    alertModal: Modal;
    @ViewChild('shareModal')
    shareModal: Modal;
    profileFeed: Roost;
    mediaFeed: Roost;
    comments: Array<Comment>;
    detailComments: Array<Comment>;
    shouts: any;
    listens: any;
    currentRoost: Roost;
    commentText: any;
    isUserLoggedIn: boolean;
    userId: number;
    user: User;
    linkToShare: string;
    title: string = "Please login to continue";


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

    constructor(private _roostService: RoostService,
        private _cacheService: CacheService,
        private _notificationService: NotificationsService,
        private fb: FacebookService,
        private _router: Router,
        private _sessionService: SessionService){
        let fbParams: FacebookInitParams = {
                        appId: '1821385414813530',
                        xfbml: true,
                        version: 'v2.5'
                        };
        this.fb.init(fbParams);
            if(null != this._cacheService.get('accessTokenRooster')){
                this.isUserLoggedIn = true;
                this.user = this._cacheService.get('user');
                this.userId = null != this.user? this.user.id : null;
            }
    }

   ngOnInit() {
        this.pageSize = 50;
        this.getPage();
    }

    getPage(page?: number) {
        this._roostService.getFeeds(page)
           .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            },
            (err) => {
                console.log(err);
                this._cacheService.removeAll();
                this._router.navigate['home'];
            });
    }

    onPageChange(page: number) {
        this.getPage(page);
    }

    showMedia(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.mediaFeed = feed;
            this.mediaModal.open();
        }
        else{
            this.loginModal.open();
        }
    }

    redirectToGMaps(latitude: number, longitude: number){
        window.open('https://maps.google.com/maps?q=' + latitude+',' + longitude);
    }

    extractDate(date: string) {
        this.diff = (new Date().getTime() - new Date(date).getTime())/1000;
        if(this.diff <= 60)
            return "Just Now";
        else if(this.diff < 3600)
            return Math.round(this.diff/60) + " minutes ago";
        else if(this.diff < 7200)
            return "1 hour ago";
        else if(this.diff < 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff <= 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
        return null;
    }

    toggleShout(feed: Roost){
        if(this.isUserLoggedIn == true){
            if((feed.isShout != true && feed.type=='PROMO') || feed.type=='COMPLAIN'){
                this._roostService.shout(feed.id)
                    .subscribe(roosts => {
                        if(feed.isShout == true){
                            feed.isShout = false;
                            feed.shouts = feed.shouts - 1;
                        }
                        else{
                            feed.isShout = true;
                            feed.shouts = feed.shouts + 1;
                        }
                        if(feed.isListened == true){
                            if(feed.type=='COMPLAIN'){
                                feed.isListened = false;
                                feed.listeners = feed.listeners - 1;
                            }
                        }
                    });
            }
        }
        else{
            this.loginModal.open();
        }
    }

    toggleListen(feed: Roost){
        if(this.isUserLoggedIn == true){
            if((feed.isListened != true && feed.type=='PROMO') || feed.type=='COMPLAIN'){
                this._roostService.listen(feed.id)
                    .subscribe(roosts => {
                        if(feed.isListened == true){
                            feed.isListened = false;
                            feed.listeners = feed.listeners - 1;
                        }
                        else{
                            feed.isListened = true;
                            feed.listeners = feed.listeners + 1;
                        }

                        if(feed.isShout == true && feed.type=='COMPLAIN'){
                                feed.isShout = false;
                                feed.shouts = feed.shouts - 1;
                        }
                    });
            }
        }
        else{
            this.loginModal.open();
        }
    }

    displayShoutsList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listShouts(feed.id)
                .subscribe(lists => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                this.myModal.open();
                });
        }
        else{
            this.loginModal.open();
        }
    }

    displayShoutsDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listShouts(feed.id)
                .subscribe(lists => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                this.showDetail(feed);
                });
        }
    }

    displayListenersList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listListeners(feed.id)
                .subscribe(lists => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listeners';
                this.myModal.open();
                });
        }
        else{
            this.loginModal.open();
        }
    }

    displayListenersDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listListeners(feed.id)
                .subscribe(lists => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listeners';
                this.showDetail(feed);
                });
        }
    }

    displayCommentsList(feed: Roost){
        if(this.isUserLoggedIn == true){
            if(feed.type == 'COMPLAIN' && feed.isShout == false){
                this.alertModal.open();
            }
            else{
                this._roostService.listComments(feed.id)
                .subscribe(lists => {
                this.processComments(lists.results);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = 'Discussions';
                this.commentsModal.open();
                this.currentRoost = feed;
                });
            }
        }
        else{
            this.loginModal.open();
        }
    }

    displayCommentsDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                this.processComments(lists.results);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';
                this.currentRoost = feed;
                this.showDetail(feed);
                });
        }
    }

    addComment(comment: any){
        if(this.isUserLoggedIn == true){
            this._roostService.comment(this.currentRoost.id, comment.value)
                .subscribe(response => {
                this.displayCommentsList(this.currentRoost);
                this.currentRoost.comments = this.currentRoost.comments + 1;
                comment.value = '';
                });
        }
    }

    processComments(lists: Array<any>){
        this.comments = new Array<Comment>();
        for(let obj of lists){
            this.comments.push(new Comment(obj.commented_by, obj.comment, obj.created_at));
        }
        this.detailComments = this.comments.slice(0, 5);
    }

    showDetail(feed: Roost, toggleListen?: boolean){
        if(this.isUserLoggedIn == true){
            if(feed.type == 'PROMO' && toggleListen == true){
                this.toggleListen(feed);
            }
            this.profileFeed = feed;
            this._roostService.listComments(feed.id)
                .subscribe(lists => {
                    this.processComments(lists.results);
                    this.currentRoost = feed;
                    this._roostService.listListeners(feed.id)
                        .subscribe(lists => {
                        this.listens = lists.results;
                        });
                    this._roostService.listShouts(feed.id)
                        .subscribe(lists => {
                        this.shouts = lists.results;
                        });
                    this.detailModal.open();
                    });
        }
        else{
            this.loginModal.open();
        }
    }

    addDisplayComment(comment: string){
            this._roostService.comment(this.currentRoost.id, comment)
                .subscribe(response => {
                this.showDetail(this.currentRoost);
                this.currentRoost.comments = this.currentRoost.comments + 1;
                });
    }

    leave(feed: Roost){
        this._roostService.leave(feed.id)
          .subscribe(response => {
             this.detailModal.close();
             window.location.reload();
          });
    }

    viewComments(feed: Roost){
        this.detailModal.close();
        this.displayCommentsList(feed);
    }

    facebookLogin(){
        this.fb.login().then(
        (response: FacebookLoginResponse) => {
            this.handleAppLogin(response.authResponse.userID, response.authResponse.accessToken);
        },
        (error: any) => console.error(error));
    }

    handleAppLogin(userId: string, accessToken: string): void{
        this._sessionService.loginUser(
            userId, accessToken)
            .subscribe(response => {
                this._cacheService.set('accessTokenRooster', response.token);
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

    shareRoost(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.linkToShare = 'https://u39cu.app.goo.gl/?link=https://www.roosterapp.in/home&apn=com.rooster.com.rooster&amv=3&ibi=CP.Complaints&ius=CP.Complaints&ct=' + feed.id;
            this.shareModal.open();
        }
        else{
            this.loginModal.open();
        }
    }

    getRoostById(id: number){
         this._roostService.getFeed(id)
           .subscribe(feed => {
               this.currentRoost = feed;
               this.showDetail(this.currentRoost);
           });
    }

    imgError(img, facebook_id){
        img.src = facebook_id != null ?
            "https://graph.facebook.com/" + facebook_id + "/picture?type=large" : "/assets/ab_logo.png";
    }

}
