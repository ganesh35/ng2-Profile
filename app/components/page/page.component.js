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
var myGlobals = require('../../globals');
var router_1 = require('@angular/router');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var PageComponent = (function () {
    function PageComponent(route, router, translate) {
        this.route = route;
        this.router = router;
        this.translate = translate;
        this.pageHeading = "PAGE_NOT_FOUND_TITLE";
        this.pageContent = "PAGE_NOT_FOUND_MSG";
    }
    PageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var page = params['page'];
            if (myGlobals.allowedPages.indexOf(page) >= 0) {
                _this.pageHeading = page + '.Heading';
                _this.pageContent = page + '.Content';
            }
        });
    };
    PageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    PageComponent = __decorate([
        core_1.Component({
            templateUrl: 'themes/' + myGlobals.themeName + '/page.tpl.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, ng2_translate_1.TranslateService])
    ], PageComponent);
    return PageComponent;
}());
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.component.js.map