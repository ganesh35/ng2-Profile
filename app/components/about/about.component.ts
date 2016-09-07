import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 

@Component({
  templateUrl: '../../themes/' + myGlobals.themeName + '/about.tpl.html',
})

export class AboutComponent {
	public pageHeading = "About";
}
