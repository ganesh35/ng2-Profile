// Retrieve dynamic pages from the RESTful service
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import myGlobals = require('../../globals'); 

import { Router, ActivatedRoute }              from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Subscription }          from 'rxjs/Subscription';


import { Page }              from './page';
import { PageService }       from './page.service';


@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/page.tpl.html',
   providers: [ PageService ]
})

export class PageComponent implements OnInit, OnDestroy{

	private sub: Subscription;
	public pageHeading = "PAGE_NOT_FOUND_TITLE";
	public pageContent = "PAGE_NOT_FOUND_MSG";

	public page: Page;
	public errorMessage = '';

	constructor(
	 	private route: ActivatedRoute,
    	private router: Router,
    	private translate: TranslateService,
    	private titleService: Title,
    	private pageService: PageService
    ){ 
		
	}

	ngOnInit(){
		this.sub = this.route.params.subscribe(params => {
	       	let pageAlias = params['page']; 
	       	this.getPage(pageAlias);
	   });
	}


 	getPage(pageAlias: string) {
    	this.pageService.getPage(pageAlias)
        	.subscribe(
            	page => { this.page = page; this.titleService.setTitle( this.page.Title ); },
                error =>  this.errorMessage = <any>error
            );
  	}

	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}	

	
		get diagnostic() { return JSON.stringify(this.page); }
}


















/*
 	ngOnInit_old() {
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
*/	