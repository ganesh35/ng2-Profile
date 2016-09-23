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
//import myGlobals = require('../../globals'); 
var http_1 = require('@angular/http');
var login_service_1 = require('./login.service');
var loginData_1 = require('./loginData');
var responseData_1 = require('./responseData');
var router_1 = require('@angular/router');
// Add the RxJS Observable operators we need in this app.
require('../../rxjs-operators');
var LoginComponent = (function () {
    function LoginComponent(_http, _loginService, _router) {
        this._http = _http;
        this._loginService = _loginService;
        this._router = _router;
        this.pageHeading = "Login Page";
        this.submitted = false;
        this.loginData = new loginData_1.LoginData('', '');
        this.responseData = new responseData_1.ResponseData('', 0, '', '');
        this.errMessage = '';
        this.successMsg = '';
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.errMessage = '';
        if (this.loginData.Password.length < 8) {
            this.errMessage = "Invalid Password";
        }
        if (this.errMessage == '') {
            console.log("Submit success" + JSON.stringify(this.loginData));
            // contact service here 
            this._loginService.doLogin(this.loginData)
                .subscribe(function (data) {
                _this.responseData = data;
                _this.successMsg = data.Response;
                localStorage.setItem('jwt', data.Token);
                _this.submitted = true;
                //this._router.navigate(['home'])
                _this._router.navigateByUrl('/feedback');
            }, function (error) { return _this.errMessage = error; });
        }
    };
    Object.defineProperty(LoginComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () {
            return JSON.stringify(this.loginData);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "responseDataJSON", {
        get: function () {
            return JSON.stringify(this.responseData);
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            //templateUrl: 'themes/' + myGlobals.themeName + '/contact.tpl.html'
            templateUrl: 'app/components/login/login.tpl.html',
            styleUrls: ['app/components/login/login.css'],
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map