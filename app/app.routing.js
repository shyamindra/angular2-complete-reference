"use strict";
const router_1 = require('@angular/router');
const landing_component_1 = require('./landing/landing.component');
const home_component_1 = require('./home/home.component');
const promotions_component_1 = require('./promotions/promotions.component');
const complaints_component_1 = require('./complaints/complaints.component');
const payment_component_1 = require('./payment/payment.component');
const profile_component_1 = require('./profile/profile.component');
const search_component_1 = require('./search/search.component');
const signUp_component_1 = require('./signUp/signUp.component');
const info_component_1 = require('./info/info.component');
const appRoutes = [
    { path: 'rooster', component: landing_component_1.LandingComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'promotions', component: promotions_component_1.PromotionsComponent },
    { path: 'complaints', component: complaints_component_1.ComplaintsComponent },
    { path: 'payment', component: payment_component_1.PaymentComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'search/:searchKey', component: search_component_1.SearchComponent },
    { path: 'signUp', component: signUp_component_1.SignUpComponent },
    { path: 'info', component: info_component_1.InfoComponent },
    { path: '', component: landing_component_1.LandingComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map