import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/profile.tpl.html'
})

export class ProfileComponent {
	public pageHeading = "Profile";
}
