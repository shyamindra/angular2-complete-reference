import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { InfoComponent } from './info/info.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { TermsComponent } from './terms/terms.component';
import { GoogleplaceDirective } from './directives/googleplace.directive';
import { AppRoutingModule } from './app-routing.module';

import {ModalModule} from 'ng2-modal';
import {Ng2PaginationModule} from 'ng2-pagination';
import { LandingComponent } from './landing/landing.component';

import {RoostService}     from './services/roost.service';
import {SessionService} from './services/session.service';
import {PromotionService} from './services/promotion.service';
import {PaymentService} from './services/payment.service';
import {ComplaintService} from './services/complaint.service';
import {UserService} from './services/user.service';
import {ConfigService} from './services/config.service';
import {FacebookService} from 'ng2-facebook-sdk';
import {CacheService} from 'ng2-cache';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {DatePickerModule} from 'ng2-datepicker'
import {ShareButtonsModule, ShareButtonsService} from 'ng2-sharebuttons';
import { PayuPaymentComponent } from './payu-payment/payu-payment.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    PromotionsComponent,
    ComplaintsComponent,
    SearchComponent,
    ProfileComponent,
    PaymentComponent,
    InfoComponent,
    AboutUsComponent,
    DisclaimerComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    CancellationComponent,
    TermsComponent,
    GoogleplaceDirective,
    LandingComponent,
    PayuPaymentComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    Ng2PaginationModule,
    HttpModule,
    AppRoutingModule,
    DatePickerModule,
    SimpleNotificationsModule,
    ShareButtonsModule.forRoot()
  ],
  providers: [
    ConfigService,
    CacheService,
    RoostService,
    SessionService,
    PromotionService,
    ComplaintService,
    PaymentService,
    UserService,
    FacebookService,
    NotificationsService,
    ShareButtonsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
