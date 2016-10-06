import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/partner.tpl.html',
})

export class PartnerComponent {
	public pageHeading = "Create An Account";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}





