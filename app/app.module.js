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
var app_component_1 = require('./app.component');
var home_component_1 = require('./components/home/home.component');
var about_component_1 = require('./components/about/about.component');
var profile_component_1 = require('./components/profile/profile.component');
var contact_component_1 = require('./components/contact/contact.component');
var login_component_1 = require('./components/login/login.component');
var feedback_component_1 = require('./components/feedback/feedback.component');
var page_component_1 = require('./components/page/page.component');
var _404_component_1 = require('./components/404/404.component');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var starrating_pipe_1 = require('./pipes/starrating.pipe');
var sanitizeHTML_pipe_1 = require('./pipes/sanitizeHTML.pipe');
var forms_1 = require('@angular/forms');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_1.routing,
                http_1.HttpModule,
                ng2_translate_1.TranslateModule.forRoot(),
                forms_1.FormsModule, http_1.HttpModule
            ],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, about_component_1.AboutComponent, profile_component_1.ProfileComponent, contact_component_1.ContactComponent, page_component_1.PageComponent, login_component_1.LoginComponent, feedback_component_1.FeedbackComponent, _404_component_1.PageNotFoundComponent, starrating_pipe_1.StarRatingPipe, sanitizeHTML_pipe_1.SanitizeHTML],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map