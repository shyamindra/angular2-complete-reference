"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
// Imports for loading & configuring the in-memory web api
var http_1 = require('@angular/http');
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var signUp_component_1 = require('./signUp/signUp.component');
var app_routing_1 = require('./app.routing');
var roost_services_service_1 = require('./services/roost-services.service');
var session_services_service_1 = require('./services/session-services.service');
var radio_1 = require('@angular2-material/radio');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule,
                radio_1.MdRadioModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                signUp_component_1.SignUpComponent
            ],
            providers: [
                roost_services_service_1.RoostService,
                session_services_service_1.SessionServices,
                ng2_cache_1.CacheService,
                { provide: http_1.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService }
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map