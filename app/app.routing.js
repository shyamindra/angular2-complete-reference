"use strict";
var router_1 = require('@angular/router');
var landing_component_1 = require('./landing/landing.component');
var home_component_1 = require('./home/home.component');
var promotions_component_1 = require('./promotions/promotions.component');
var complaints_component_1 = require('./complaints/complaints.component');
var payment_component_1 = require('./payment/payment.component');
var profile_component_1 = require('./profile/profile.component');
var search_component_1 = require('./search/search.component');
var signUp_component_1 = require('./signUp/signUp.component');
var appRoutes = [
    { path: 'rooster', component: landing_component_1.LandingComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'promotions', component: promotions_component_1.PromotionsComponent },
    { path: 'complaints', component: complaints_component_1.ComplaintsComponent },
    { path: 'payment', component: payment_component_1.PaymentComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'search', component: search_component_1.SearchComponent },
    { path: 'signUp', component: signUp_component_1.SignUpComponent },
    { path: '', component: landing_component_1.LandingComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map