"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home/home.component');
var about_component_1 = require('./components/about/about.component');
var contact_component_1 = require('./components/contact/contact.component');
var profile_component_1 = require('./components/profile/profile.component');
var page_component_1 = require('./components/page/page.component');
var _404_component_1 = require('./components/404/404.component');
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'page/:page', component: page_component_1.PageComponent },
    { path: '**', component: _404_component_1.PageNotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map