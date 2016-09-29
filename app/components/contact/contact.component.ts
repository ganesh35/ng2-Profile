import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
import { Title }     from '@angular/platform-browser';

@Component({
 	templateUrl: 'themes/' + myGlobals.themeName + '/contact.tpl.html'
 })

export class ContactComponent {
	public pageHeading = "Contact";
	public constructor(private titleService: Title ) { 
		this.titleService.setTitle( this.pageHeading );
	}
}



