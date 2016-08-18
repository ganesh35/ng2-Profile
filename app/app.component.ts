import { Component} from '@angular/core';


var theme = 'default';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/'+ theme +'/theme.tpl.html',
  styleUrls: [
  		'../themes/'+ theme +'/css/theme.css'
  	]
})

export class AppComponent {
	public siteName = "Buchman, L.";

}
