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

  getPage (pageAlias: string): Observable<Page> {
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
