import { NgModule  }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';


import { routing }        from './app.routing';

import {TranslateModule, TranslateLoader} from 'ng2-translate/ng2-translate';
import {  Http, HTTP_PROVIDERS } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, routing,
  TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
          deps: [Http]
        })
        ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, ProfileComponent, ContactComponent],
  bootstrap:    [ AppComponent ],
  exports: [TranslateModule],
})
export class AppModule { }
