import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {PaymentComponent} from './payment/payment.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {InfoComponent} from './info/info.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CancellationComponent} from './cancellation/cancellation.component';
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {FaqComponent} from './faq/faq.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsComponent} from './terms/terms.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PayuPaymentComponent} from './payu-payment/payu-payment.component';

const routes: Routes = [
    { path: 'rooster', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/:ct', component: HomeComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'complaints', component: ComplaintsComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search/:searchKey', component: SearchComponent },
    { path: 'info', component: InfoComponent},
    { path:	'info/aboutUs', component: AboutUsComponent },
    { path:	'info/cancellation', component: CancellationComponent },
    { path:	'info/disclaimer', component: DisclaimerComponent },
    { path:	'info/faq', component: FaqComponent },
    { path:	'info/privacy', component: PrivacyPolicyComponent },
    { path:	'info/terms', component: TermsComponent },
    { path:	'', component: LandingComponent },
    { path:	'contactUs', component: ContactUsComponent },
    { path:	'payuPayment', component: PayuPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
