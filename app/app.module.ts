import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend} from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { AppComponent }   from './app.component';
import {HomeComponent}    from './home/home.component';
import {SignUpComponent} from './signUp/signUp.component';
import {ProfileComponent} from './profile/profile.component';
import { routing }        from './app.routing';
import {RoostService}     from './services/roost-services.service';
import {SessionServices} from './services/session-services.service';
import { MdRadioModule } from '@angular2-material/radio';
import {CacheService} from 'ng2-cache/ng2-cache';
import {PromotionsService} from './services/promotions.service';
import {ComplaintsService} from './services/complaint.service';
import {UserServices} from './services/user-services.service';

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
    CacheService,
    RoostService,
    SessionServices,
    PromotionsService,
    ComplaintsService,
    UserServices,
    { provide: XHRBackend, useClass: InMemoryBackendService }
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
