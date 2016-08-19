import { Component} from '@angular/core';

//import {  Http, HTTP_PROVIDERS } from '@angular/http';
import {TranslateService} from 'ng2-translate/ng2-translate';

var themeName = 'default';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/'+ themeName +'/theme.tpl.html',
})

export class AppComponent {
	public siteName = "Buchman, L.";
	
/* 	constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
*/
}
