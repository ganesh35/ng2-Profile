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
var StarRatingPipe = (function () {
    function StarRatingPipe() {
    }
    StarRatingPipe.prototype.transform = function (value, icon, iconClass, max) {
        if (max == undefined) {
            max = 6;
        }
        if (iconClass == undefined) {
            iconClass = "text-danger";
        }
        if (icon == undefined) {
            icon = "fa fa-asterisk";
        }
        //var html = '<i class="'+ iconClass + ' ' + icon +'">'+value+'</i>';
        var html = '';
        for (var i = 1; i <= max; i++) {
            html = html + '<i class="' + icon;
            if (value > 1) {
                html = html + ' ' + iconClass;
                value--;
            }
            html = html + '"></i>\n';
        }
        //console.log(html);
        return html;
    };
    StarRatingPipe = __decorate([
        core_1.Pipe({ name: 'starRating' }), 
        __metadata('design:paramtypes', [])
    ], StarRatingPipe);
    return StarRatingPipe;
}());
exports.StarRatingPipe = StarRatingPipe;
//# sourceMappingURL=starrating.pipe.js.map