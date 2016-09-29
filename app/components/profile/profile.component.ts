import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import myGlobals = require('../../globals'); 
@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/profile.tpl.html'
})

export class ProfileComponent {
	public pageHeading = "Profile";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}
