import { Component, OnInit } from '@angular/core';
import myGlobals = require('./globals'); 
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['themes/' + myGlobals.themeName + '/css/theme.css'],
    templateUrl: 'themes/' + myGlobals.themeName + '/index.tpl.html',
    encapsulation: ViewEncapsulation.None, 

})
export class AppComponent implements OnInit { 
	public langList = [];
    public profile: any;
    public showCookieConcent = true;
	constructor(private translate: TranslateService) {
        //translate.setDefaultLang('en');
        translate.setDefaultLang('en');
        translate.use('de');
    }

    ngOnInit(){
        var temp = localStorage.getItem("showCookieConcent");
        if(temp == false) this.showCookieConcent = false;
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

    closeCookieConcent(){
        this.showCookieConcent=false;
        localStorage.setItem("showCookieConcent", false);
    }

}