// Retrieve static pages from language file
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import myGlobals = require('../../globals'); 

import { Router, ActivatedRoute }              from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Subscription }          from 'rxjs/Subscription';

@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/statPage.tpl.html',
})

export class StatPageComponent implements OnInit, OnDestroy{

	private sub: Subscription;
	public pageHeading = "PAGE_NOT_FOUND_TITLE";
	public pageContent = "PAGE_NOT_FOUND_MSG";

	constructor(
	 	private route: ActivatedRoute,
    	private router: Router,
    	private translate: TranslateService,
    	private titleService: Title
    ){ 
		
	}

 	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
	       let page = params['page']; 
	       if(myGlobals.allowedPages.indexOf(page)>=0)
	       {
	       		this.pageHeading = page + '.Heading';
	       		this.pageContent = page + '.Content';

				this.translate.get(this.pageHeading).subscribe((res: string) => {
             		this.pageHeading = res;
        		});
        		this.titleService.setTitle( this.pageHeading );
        	}

	    });
	}
	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}	
}
