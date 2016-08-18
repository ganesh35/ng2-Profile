import { Component} from '@angular/core';

var themeName = 'default';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/'+ themeName +'/theme.tpl.html',
  styleUrls: [
  		'../themes/'+ themeName +'/css/theme.css'
  	]
})

export class AppComponent {
	public siteName = "Buchman, L.";

}
