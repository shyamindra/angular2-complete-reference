import { Routes, RouterModule } from '@angular/router';


import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {PaymentComponent} from './payment/payment.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {SignUpComponent} from './signUp/signUp.component';

const appRoutes: Routes = [
    { path: 'rooster', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'complaints', component: ComplaintsComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search/:searchKey', component: SearchComponent },
    { path: 'signUp', component: SignUpComponent },
    { path:	'', component: LandingComponent } 
];

export const routing = RouterModule.forRoot(appRoutes);