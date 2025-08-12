import {OnInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RoostService} from '../services/roost.service';
import {SessionService} from '../services/session.service';
import {Roost} from '../shared/roost';
import {Comment} from '../shared/comment';
import {User} from '../shared/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RoostService, SessionService]
})
export class HomeComponent implements OnInit {

    header = "Home Page";
    sub: any;
    roostId: string | undefined;
    isLoading = true;
    roosts: Roost[] = [];
    diff: number = 0;
    pageSize: number = 0;
    page: number = 0;
    total: number = 0;
    lists: any[] = [];
    displayList: boolean = false;
    displayListTitle: string = '';
    profileFeed: Roost | undefined;
    mediaFeed: Roost | undefined;
    comments: Comment[] = [];
    detailComments: Comment[] = [];
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

    constructor(private route: ActivatedRoute,
            private roostService: RoostService,
            private router: Router,
            private sessionService: SessionService){
        this.sub = this.route.queryParams
        .subscribe(params => {
            this.roostId = params['ct'];
            if (this.roostId !== undefined && this.roostId !== null && this.roostId !== '') {
                this.getRoostById(Number(this.roostId));
                if (this.isUserLoggedIn) {
                  this.router.navigate(['home']);
                }
            } else if (this.roostId === '') {
                this.router.navigate(['home']);
            }
    });
    }

    ngOnInit(){
        this.pageSize = 50;
        this.getPage();
    }

    getPage(page?: number) {
        this.roostService.getFeeds(page)
           .subscribe((feeds: { count: number, results: Roost[] }) => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results as Roost[];
            this.page = null != page? page: this.page;
            },
            (err: any) => {
                console.log(err);
                this.router.navigate(['home']);
            });
    }

    onPageChange(page: number) {
        this.getPage(page);
    }

    showMedia(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.mediaFeed = feed;
        }
        else{
            // this.loginModal.open(); // Deprecated
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
                this.roostService.shout(feed.id)
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
            // this.loginModal.open(); // Deprecated
        }
    }

    toggleListen(feed: Roost){
        if(this.isUserLoggedIn == true){
            if((feed.isListened != true && feed.type=='PROMO') || feed.type=='COMPLAIN'){
                this.roostService.listen(feed.id)
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
            // this.loginModal.open(); // Deprecated
        }
    }

    displayShoutsList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.roostService.listShouts(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                // this.myModal.open(); // Deprecated
                });
        }
        else{
            // this.loginModal.open(); // Deprecated
        }
    }

    displayShoutsDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.roostService.listShouts(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Followers' : 'Shouts';
                this.showDetail(feed);
                });
        }
    }

    displayListenersList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.roostService.listListeners(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = feed.type == 'PROMO' ? 'Reach' : 'Listeners';
                // this.myModal.open(); // Deprecated
                });
        }
        else{
            // this.loginModal.open(); // Deprecated
        }
    }

    displayListenersDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.roostService.listListeners(feed.id)
                .subscribe((lists: { results: any[] }) => {
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
                // this.alertModal.open(); // Deprecated
            }
            else{
                this.roostService.listComments(feed.id)
                .subscribe((lists: { results: any[] }) => {
                this.processComments(lists.results);
                this.displayList = true;
                this.lists = lists.results;
                this.displayListTitle = 'Discussions';
                // this.commentsModal.open(); // Deprecated
                this.currentRoost = feed;
                });
            }
        }
        else{
            // this.loginModal.open(); // Deprecated
        }
    }

    displayCommentsDetailList(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.roostService.listComments(feed.id)
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

    addComment(comment: HTMLInputElement){
        if(this.isUserLoggedIn == true && this.currentRoost){
            this.roostService.comment(this.currentRoost.id, comment.value)
                .subscribe((response: any) => {
                this.displayCommentsList(this.currentRoost as Roost);
                if (this.currentRoost) {
                    this.currentRoost.comments = this.currentRoost.comments + 1;
                }
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
            this.roostService.listComments(feed.id)
                .subscribe((lists: { results: any[] }) => {
                    this.processComments(lists.results);
                    this.currentRoost = feed;
                    this.roostService.listListeners(feed.id)
                        .subscribe((lists: { results: any[] }) => {
                        this.listens = lists.results;
                        });
                    this.roostService.listShouts(feed.id)
                        .subscribe((lists: { results: any[] }) => {
                        this.shouts = lists.results;
                        });
                    // this.detailModal.open(); // Deprecated
                    });
        }
        else{
            // this.loginModal.open(); // Deprecated
        }
    }

    addDisplayComment(comment: string){
        if (this.currentRoost) {
            this.roostService.comment(this.currentRoost.id, comment)
                .subscribe((response: any) => {
                if (this.currentRoost) {
                    this.showDetail(this.currentRoost);
                    this.currentRoost.comments = this.currentRoost.comments + 1;
                }
                });
        }
    }

    leave(feed: Roost){
        this.roostService.leave(feed.id)
          .subscribe((response: any) => {
             // this.detailModal.close(); // Deprecated
             window.location.reload();
          });
    }

    viewComments(feed: Roost){
        // this.detailModal.close(); // Deprecated
        this.displayCommentsList(feed);
    }

    facebookLogin(){
        // this.fb.login().then(
        // (response: FacebookLoginResponse) => {
        //     this.handleAppLogin(response.authResponse.userID, response.authResponse.accessToken);
        // },
        // (error: any) => console.error(error));
    }

    handleAppLogin(userId: string, accessToken: string): void{
        this.sessionService.loginUser(
            userId, accessToken)
            .subscribe((response: any) => {
                // this._cacheService.set('accessTokenRooster', response.token); // Deprecated
                // this._cacheService.set('user', response.user); // Deprecated
                this.isUserLoggedIn = true;
                window.location.reload();
            },
            (err: any) => {
                console.log(err);
                // this._cacheService.removeAll(); // Deprecated
                this.router.navigate(['home']);
            });
    }

    shareRoost(feed: Roost){
        if(this.isUserLoggedIn == true){
            this.linkToShare = 'https://u39cu.app.goo.gl/?link=https://www.roosterapp.in/home&apn=com.rooster.com.rooster&amv=3&ibi=CP.Complaints&ius=CP.Complaints&ct=' + feed.id;
            // this.shareModal.open(); // Deprecated
        }
        else{
            // this.loginModal.open(); // Deprecated
        }
    }

    getRoostById(id: number){
         this.roostService.getFeed(id)
           .subscribe((feed: Roost) => {
               this.currentRoost = feed;
               this.showDetail(this.currentRoost);
           });
    }

    imgError(img: HTMLImageElement, facebook_id: string){
        img.src = facebook_id != null ?
            "https://graph.facebook.com/" + facebook_id + "/picture?type=large" : "/assets/ab_logo.png";
    }

}