import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
  templateUrl: '../../themes/' + myGlobals.themeName + '/contact.tpl.html'
})

export class ContactComponent {
	public pageHeading = "Contact";
}



