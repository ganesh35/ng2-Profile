import { Component } from '@angular/core';
//import myGlobals = require('../../globals'); 
import { Http } from '@angular/http';
import { LoginService }       from './login.service';
import { LoginData }       from './loginData';
import { ResponseData }       from './responseData';

import { Router} from '@angular/router';
// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Component({
 	//templateUrl: 'themes/' + myGlobals.themeName + '/contact.tpl.html'
 	templateUrl: 'app/components/login/login.tpl.html',
 	styleUrls: ['app/components/login/login.css'],
 	providers: [ LoginService ]
 })

export class LoginComponent {
	public pageHeading = "Login Page";
	submitted = false;
	loginData = new LoginData('','');
	responseData = new ResponseData('',0,'', '');
	errMessage = '';
	successMsg='';
	

	constructor(private _http: Http, private _loginService: LoginService, private _router: Router) { }

	onSubmit() { 
		this.errMessage='';
		if(this.loginData.Password.length < 8) { this.errMessage="Invalid Password"; }
		if(this.errMessage==''){
			
			console.log("Submit success" + JSON.stringify(this.loginData) );	
			// contact service here 

				this._loginService.doLogin(this.loginData)
                    .subscribe(
						data  => { 
							this.responseData = data; 
							this.successMsg = data.Response;
							localStorage.setItem('jwt', data.Token);
							this.submitted = true;

							//this._router.navigate(['home'])
							this._router.navigateByUrl('/feedback');
						},
                       error =>  this.errMessage = <any>error);
			// contact service here /


		}

		
	}


	// TODO: Remove this when we're done
  	get diagnostic() { 
  		return JSON.stringify(	this.loginData) ; 
  	}

  	get responseDataJSON(){
  		return JSON.stringify(	this.responseData) ; 	
  	}


}




