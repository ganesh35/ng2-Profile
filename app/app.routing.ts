import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ContactComponent }      from './components/contact/contact.component';
import { ProfileComponent }      from './components/profile/profile.component';

const appRoutes: Routes = [
	{ path: '',    redirectTo: '/home',    pathMatch: 'full' },
  	{ path: 'home',    component: HomeComponent },
  	{ path: 'about',    component: AboutComponent },
  	{ path: 'profile',    component: ProfileComponent },
  	{ path: 'contact',    component: ContactComponent }
];
export const routing = RouterModule.forRoot(appRoutes);