import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { MdRadioModule } from '@angular2-material/radio';
import { HttpModule, XHRBackend} from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import { routing }        from './app.routing';
import { AppComponent }   from './app.component';
import {HomeComponent}    from './home/home.component';
import {SignUpComponent} from './signUp/signUp.component';
import {ProfileComponent} from './profile/profile.component'

import {RoostService}     from './services/roost.service';
import {SessionService} from './services/session.service';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PromotionsService} from './services/promotion.service';
import {ComplaintsService} from './services/complaint.service';
import {UserService} from './services/user.service';
import {ConfigService} from './services/config.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    MdRadioModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    ProfileComponent
  ],
  providers: [
    ConfigService,
    CacheService,
    RoostService,
    SessionService,
    PromotionsService,
    ComplaintsService,
    UserService,
    { provide: XHRBackend, useClass: InMemoryBackendService }
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
