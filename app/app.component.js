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
var myGlobals = require('./globals');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var core_2 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(translate) {
        this.translate = translate;
        this.langList = [];
        this.showCookieConcent = 'true';
        this.currentLang = '';
        //translate.setDefaultLang('en');
        translate.setDefaultLang(myGlobals.languageDefault);
        translate.use(myGlobals.languageDefault);
        this.currentLang = myGlobals.languageDefault;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var temp = localStorage.getItem("showCookieConcent");
        if (temp == '' || temp == undefined)
            this.showCookieConcent = '';
        this.langList = myGlobals.languageList;
        this.translate.get('Profile').subscribe(function (res) {
            _this.profile = res;
        });
    };
    AppComponent.prototype.onLangChange = function (val) {
        var _this = this;
        this.translate.use(val);
        this.currentLang = val;
        this.translate.get('Profile').subscribe(function (res) {
            _this.profile = res;
        });
    };
    AppComponent.prototype.closeCookieConcent = function () {
        this.showCookieConcent = '';
        localStorage.setItem("showCookieConcent", '');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styleUrls: ['themes/' + myGlobals.themeName + '/css/theme.css'],
            templateUrl: 'themes/' + myGlobals.themeName + '/index.tpl.html',
            encapsulation: core_2.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map