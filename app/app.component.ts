import { Component, OnInit } from '@angular/core';
import myGlobals = require('./globals'); 
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ViewEncapsulation} from '@angular/core';
var themeName = 'theme1';

@Component({
    selector: 'my-app',
    styleUrls: ['themes/' + myGlobals.themeName + '/css/theme.css'],
    templateUrl: 'themes/' + myGlobals.themeName + '/index.tpl.html',
    encapsulation: ViewEncapsulation.None, 

})
export class AppComponent implements OnInit { 
	public langList = [];
    public profile: any;

	constructor(private translate: TranslateService) {
        //translate.setDefaultLang('en');
        translate.setDefaultLang('en');
        translate.use('de');
    }

    ngOnInit(){
    	this.langList = [
    		{lang:'en', 'flag':'en.gif' },
    		{lang:'de', 'flag':'de.gif' }
    	];

        this.translate.get('Profile').subscribe((res: string) => {
             this.profile = res;
        });
    }

    onLangChange(val){
    	this.translate.use(val);
        this.translate.get('Profile').subscribe((res: string) => {
             this.profile = res;
        });
    }

}