import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ContactComponent }      from './components/contact/contact.component';
import { PageComponent }      from './components/page/page.component';
import { PageNotFoundComponent }      from './components/404/404.component';
import {routing} from './app.routing';


import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';


import { StarRatingPipe } from './pipes/starrating.pipe';
import { SanitizeHTML } from './pipes/sanitizeHTML.pipe';

import { ImprintPageComponent } from './components/imprint/imprint.component';
import { GalleryPageComponent } from './components/gallery/gallery.component';
import { PricePageComponent } from './components/pricelist/pricelist.component';

import { FormsModule }   from '@angular/forms';

@NgModule({
  imports:      [ 
      BrowserModule, 
      routing,
      HttpModule,
      TranslateModule.forRoot(),
      FormsModule, HttpModule
   ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, ContactComponent, PageComponent, ImprintPageComponent,  GalleryPageComponent, PricePageComponent, PageNotFoundComponent, StarRatingPipe, SanitizeHTML ],
  bootstrap:    [ AppComponent  ]
})
export class AppModule { }