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
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var themeName = 'theme3';
var AppComponent = (function () {
    function AppComponent(translate) {
        this.translate = translate;
        this.langList = [];
        //translate.setDefaultLang('en');
        translate.setDefaultLang('en');
        translate.use('de');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.langList = [
            { lang: 'en', 'flag': 'en.gif' },
            { lang: 'de', 'flag': 'de.gif' }
        ];
        this.translate.get('Profile').subscribe(function (res) {
            _this.profile = res;
        });
    };
    AppComponent.prototype.onLangChange = function (val) {
        var _this = this;
        this.translate.use(val);
        this.translate.get('Profile').subscribe(function (res) {
            _this.profile = res;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '../themes/' + themeName + '/theme.tpl.html',
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map