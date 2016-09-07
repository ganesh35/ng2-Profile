import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
  templateUrl: '../../themes/' + myGlobals.themeName + '/home.tpl.html'
})

export class HomeComponent {
	public pageHeading = "Welcome";
}
