import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/register.tpl.html',
})

export class RegisterComponent {
	public pageHeading = "Customer Registration";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}





