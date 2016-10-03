

### get json from api

## File: app.module.ts
```javascript
import { HttpModule, JsonpModule } from '@angular/http';
...
@NgModule({
  imports:      [ 
      BrowserModule, 
      routing,
      HttpModule, 
      JsonpModule,
...

```


## File: app/components/page/page.ts
```javascript
export interface Page {
	_id: { $id: string },
	UserId: string,
	Title: string,
	Alias: string,
	Content: string,
	Lang: string,
	CreatedAt: any,
	UpdatedAt: any,
	Published: number,
	MetaTags : MetaTag[],
	Tags: string[]
}

export interface MetaTag {
	Name: string,
	Content: string
}
```


## File: app/components/page/page.service.ts
```javascript
// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Page }           from './page';
import { Observable }     from 'rxjs/Observable';



@Injectable()
export class PageService {
	private mainUrl = 'http://localhost:8080/api/1.0.0';  // URL to web API
  	private pageUrl =  '';
	//http://localhost:8080/api/1.0.0/page/ykcb4MJqXW?Lang=en-GB
  	constructor (private http: Http) {}

  getPage (pageAlias: string): Observable<Page[]> {
		this.pageUrl=  this.mainUrl + '/page';  // URL to web API

		this.pageUrl = this.pageUrl + '/' + pageAlias;
    	return this.http.get(this.pageUrl)
			.map(this.extractData)
        	.catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.Response || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

```


## File: app/components/page/page.component.ts
```javascript
...
import { Title }     from '@angular/platform-browser';
import { Subscription }          from 'rxjs/Subscription';
import { Page }              from './page';
import { PageService }       from './page.service';
...
@Component({
   templateUrl: 'themes/' + myGlobals.themeName + '/page.tpl.html',
   providers: [ PageService ]
})
export class PageComponent implements OnInit, OnDestroy{
...
	private sub: Subscription;
	public page: Page;

	constructor(
		...
		private titleService: Title,
    	private pageService: PageService
    ){}
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
}




