import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/login.tpl.html',
})

export class LoginComponent {
	public pageHeading = "Login";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}





