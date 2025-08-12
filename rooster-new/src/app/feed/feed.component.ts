import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoostService } from '../services/roost.service';
import { SessionService } from '../services/session.service';
import { Roost } from '../shared/roost';
import { User } from '../shared/user';
import { Comment } from '../shared/comment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// TODO: Replace ng2-cache, ng2-pagination, ng2-modal, angular2-notifications, ng2-facebook-sdk with modern Angular alternatives.

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [RoostService, SessionService]
})
export class FeedComponent implements OnInit {

  header = "Home Page";
    isLoading = true;
    roosts: Roost[] = [];
    diff: number = 0;
    pageSize: number = 0;
    page: number = 0;
    total: number = 0;
    lists: any[] = [];
    displayList: boolean = false;
    displayListTitle: string = '';
    // @ViewChild('myModal')
    // myModal: Modal;
    // @ViewChild('commentsModal')
    // commentsModal: Modal;
    // @ViewChild('detailModal')
    // detailModal: Modal;
    // @ViewChild('loginModal')
    // loginModal: Modal;
    // @ViewChild('mediaModal')
    // mediaModal: Modal;
    // @ViewChild('alertModal')
    // alertModal: Modal;
    // @ViewChild('shareModal')
    // shareModal: Modal;
    profileFeed: Roost | undefined;
    mediaFeed: Roost | undefined;
    comments: Array<Comment> = [];
    detailComments: Array<Comment> = [];
    shouts: any[] = [];
    listens: any[] = [];
    currentRoost: Roost | undefined;
    commentText: HTMLInputElement | undefined;
    isUserLoggedIn: boolean = false;
    userId: number | undefined;
    user: User | undefined;
    linkToShare: string = '';
    title: string = "Please login to continue";
    searchQry: string | undefined;


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
        private _router: Router,
        private _sessionService: SessionService){}

    ngOnInit(): void {
        this.pageSize = 50;
        this.getPage();
    }

    public getPage(page?: number): void {
        this._roostService.getFeeds(page)
           .subscribe((feeds: { count: number, results: Roost[] }) => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            },
            (err: any) => {
                console.log(err);
                this._router.navigate(['home']);
            });
    }

    public onPageChange(page: number): void {
        this.getPage(page);
    }

    public showMedia(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this.mediaFeed = feed;
            // TODO: Implement a modern modal for media
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public redirectToGMaps(latitude: number, longitude: number): void {
        window.open('https://maps.google.com/maps?q=' + latitude+',' + longitude);
    }

    public extractDate(date: string): string {
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
        return ""; // Return empty string instead of null
    }

    public toggleShout(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            if((feed.isShout != true && feed.type=='PROMO') || feed.type=='COMPLAIN'){
                this._roostService.shout(feed.id)
                    .subscribe((roosts: any) => {
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
            // TODO: Implement a modern modal for login
        }
    }

    public toggleListen(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            if((feed.isListened != true && feed.type=='PROMO') || feed.type=='COMPLAIN'){
                this._roostService.listen(feed.id)
                    .subscribe((roosts: any) => {
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
            // TODO: Implement a modern modal for login
        }
    }

    public displayShoutsList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this._roostService.listShouts(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                // TODO: Implement a modern modal
                });
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public displayShoutsDetailList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this._roostService.listShouts(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                this.showDetail(feed);
                });
        }
    }

    public displayListenersList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this._roostService.listListeners(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listeners';
                // TODO: Implement a modern modal
                });
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public displayListenersDetailList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this._roostService.listListeners(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listeners';
                this.showDetail(feed);
                });
        }
    }

    public displayCommentsList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            if(feed.type == 'COMPLAIN' && feed.isShout == false){
                // TODO: Implement a modern modal
            }
            else{
                this._roostService.listComments(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.processComments(lists.results);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = 'Discussions';
                // TODO: Implement a modern modal
                this.currentRoost = feed;
                });
            }
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public displayCommentsDetailList(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this._roostService.listComments(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.processComments(lists.results);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Comments' : 'Discussions';
                this.currentRoost = feed;
                this.showDetail(feed);
                });
        }
    }

    public addComment(comment: HTMLInputElement): void {
        if(this.isUserLoggedIn == true && this.currentRoost){
            this._roostService.comment(this.currentRoost.id, comment.value)
                .subscribe((response: any) => {
                this.displayCommentsList(this.currentRoost as Roost);
                if (this.currentRoost) {
                    this.currentRoost.comments = this.currentRoost.comments + 1;
                }
                comment.value = '';
                });
        }
    }

    public processComments(lists: Array<any>): void {
        this.comments = new Array<Comment>();
        for(let obj of lists){
            this.comments.push(new Comment(obj.commented_by, obj.comment, obj.created_at));
        }
        this.detailComments = this.comments.slice(0, 5);
    }

    public showDetail(feed: Roost, toggleListen?: boolean): void {
        if(this.isUserLoggedIn == true){
            if(feed.type == 'PROMO' && toggleListen == true){
                this.toggleListen(feed);
            }
            this.profileFeed = feed;
            this._roostService.listComments(feed.id)
                .subscribe((lists: { results: any[] }) => {
                    this.processComments(lists.results);
                    this.currentRoost = feed;
                    this._roostService.listListeners(feed.id)
                        .subscribe((lists: { results: any[] }) => {
                        this.listens = lists.results;
                        });
                    this._roostService.listShouts(feed.id)
                        .subscribe((lists: { results: any[] }) => {
                        this.shouts = lists.results;
                        });
                    // TODO: Implement a modern modal
                    });
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public addDisplayComment(comment: string): void {
        if (this.currentRoost) {
            this._roostService.comment(this.currentRoost.id, comment)
                .subscribe((response: any) => {
                if (this.currentRoost) {
                    this.showDetail(this.currentRoost);
                    this.currentRoost.comments = this.currentRoost.comments + 1;
                }
                });
        }
    }

    public leave(feed: Roost): void {
        this._roostService.leave(feed.id)
          .subscribe((response: any) => {
             // TODO: Implement a modern modal
             window.location.reload();
          });
    }

    public viewComments(feed: Roost): void {
        // TODO: Implement a modern modal
        this.displayCommentsList(feed);
    }

    public handleAppLogin(userId: string, accessToken: string): void {
        this._sessionService.loginUser(
            userId, accessToken)
            .subscribe((response: any) => {
                // TODO: Replace ng2-cache with localStorage
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('accessTokenRooster', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                }
                this.isUserLoggedIn = true;
                window.location.reload();
            },
            (err) => {
                console.log(err);
                // TODO: Replace ng2-cache with localStorage
                if (typeof localStorage !== 'undefined') {
                    localStorage.clear();
                }
                this._router.navigate(['home']);
            });
    }

    public shareRoost(feed: Roost): void {
        if(this.isUserLoggedIn == true){
            this.linkToShare = 'https://u39cu.app.goo.gl/?link=https://www.roosterapp.in/home&apn=com.rooster.com.rooster&amv=3&ibi=CP.Complaints&ius=CP.Complaints&ct=' + feed.id;
            // TODO: Implement a modern modal for sharing
        }
        else{
            // TODO: Implement a modern modal for login
        }
    }

    public getRoostById(id: number): void {
         this._roostService.getFeed(id)
           .subscribe((feed: Roost) => {
               this.currentRoost = feed;
               this.showDetail(this.currentRoost);
           });
    }

    public imgError(img: HTMLImageElement, facebook_id: string): void {
        img.src = (facebook_id !== null && facebook_id !== undefined) ?
            "https://graph.facebook.com/" + facebook_id + "/picture?type=large" : "/assets/ab_logo.png";
    }
