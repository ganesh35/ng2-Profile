import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/amc.tpl.html',
})

export class AMCComponent {
	public pageHeading = "ANNUAL MAINTENANCE CONTRACT (AMC)";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}





