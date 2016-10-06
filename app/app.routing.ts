import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { ContactComponent }      from './components/contact/contact.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { PageComponent }      from './components/page/page.component';
import { PageNotFoundComponent }      from './components/404/404.component';
import { StatPageComponent }      from './components/statPage/statPage.component';

import { LoginComponent }      from './components/login/login.component';
import { AMCComponent }      from './components/amc/amc.component';
import { RegisterComponent }      from './components/register/register.component';
import { PartnerComponent }      from './components/partner/partner.component';

const appRoutes: Routes = [
	  { path: '',    redirectTo: '/home',    pathMatch: 'full' },
  	{ path: 'home',    component: HomeComponent },
  	{ path: 'profile',    component: ProfileComponent },
  	{ path: 'contact',    component: ContactComponent },
  	{ path: 'page/:page',    component: StatPageComponent },
    { path: 'fmg/:page',    component: StatPageComponent },
  	{ path: 'dpage/:page',    component: PageComponent },
  	

	  { path: 'AMC',    component: AMCComponent },
  	{ path: 'partner/:usertype',    component: PartnerComponent },
  	{ path: 'login',    component: LoginComponent },
  	{ path: 'register/:usertype',    component: RegisterComponent },  	
    { path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(appRoutes);