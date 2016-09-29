import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/about.tpl.html',
})

export class AboutComponent {
	public pageHeading = "About";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}





