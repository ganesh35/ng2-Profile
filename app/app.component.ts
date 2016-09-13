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
    public showCookieConcent = 'true';
    public currentLang = '';
	constructor(private translate: TranslateService) {
        //translate.setDefaultLang('en');
        translate.setDefaultLang(myGlobals.languageDefault);
        translate.use(myGlobals.languageDefault);
        this.currentLang=myGlobals.languageDefault;
    }

    ngOnInit(){
        var temp = localStorage.getItem("showCookieConcent");
        if(temp == '' || temp == undefined) this.showCookieConcent = '';

        this.langList  = myGlobals.languageList;

        this.translate.get('Profile').subscribe((res: string) => {
             this.profile = res;
        });
    }

    onLangChange(val){
    	this.translate.use(val);
        this.currentLang=val;
        
        this.translate.get('Profile').subscribe((res: string) => {
             this.profile = res;
        });

    }

    closeCookieConcent(){
        this.showCookieConcent='';
        localStorage.setItem("showCookieConcent", '');
    }

}