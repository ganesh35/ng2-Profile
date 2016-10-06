import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HomeComponent }      from './components/home/home.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';
import { PageComponent }      from './components/page/page.component';
import { StatPageComponent }      from './components/statPage/statPage.component';
import { PageNotFoundComponent }      from './components/404/404.component';
import {routing} from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import { StarRatingPipe } from './pipes/starrating.pipe';
import { SanitizeHTML } from './pipes/sanitizeHTML.pipe';
import { FormsModule }   from '@angular/forms';

import { LoginComponent }      from './components/login/login.component';
import { AMCComponent }      from './components/amc/amc.component';
import { RegisterComponent }      from './components/register/register.component';
import { PartnerComponent }      from './components/partner/partner.component';

@NgModule({
  imports:      [ 
      BrowserModule, 
      routing,
      HttpModule,
      TranslateModule.forRoot(),
      FormsModule, HttpModule, JsonpModule
   ],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, ContactComponent, PageComponent, StatPageComponent, PageNotFoundComponent, StarRatingPipe, SanitizeHTML, LoginComponent, AMCComponent, RegisterComponent,PartnerComponent  ],
  providers: [
    Title
  ],
  bootstrap:    [ AppComponent  ]
})
export class AppModule { }