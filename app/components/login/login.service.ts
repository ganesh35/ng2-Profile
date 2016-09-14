// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { LoginData }       from './loginData';
import { ResponseData }       from './responseData';
import { Observable }     from 'rxjs/Observable';








@Injectable()
export class LoginService {

	constructor (private http: Http) {}

  	private loginUrl = 'http://localhost/motmot_ng2/api/login';  // URL to web API



  doLogin (loginData: LoginData): Observable<ResponseData> {
    let body = JSON.stringify(loginData);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, body, headers)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {

    let body = res.json();
    //console.log("Raw response: " + JSON.stringify(body) );
    return body || { };
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

