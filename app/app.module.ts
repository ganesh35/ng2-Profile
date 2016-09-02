import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';

import {routing} from './app.routing';


import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';


@NgModule({
  imports:      [ 
      BrowserModule, 
      routing,
      HttpModule,
      TranslateModule.forRoot()
   ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, ProfileComponent, ContactComponent ],
  bootstrap:    [ AppComponent  ]
})
export class AppModule { }