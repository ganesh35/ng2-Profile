import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import myGlobals = require('../../globals'); 
@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/home.tpl.html'
})

export class HomeComponent {
	public pageHeading = "Fix My Gadgets : Your companion for all your service calls - HOME";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}


