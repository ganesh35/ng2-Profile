import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ContactComponent }      from './components/contact/contact.component';
import { PageComponent }      from './components/page/page.component';
import { PageNotFoundComponent }      from './components/404/404.component';

import { ImprintPageComponent } from './components/imprint/imprint.component';
import { GalleryPageComponent } from './components/gallery/gallery.component';
import { PricePageComponent } from './components/pricelist/pricelist.component';


const appRoutes: Routes = [
	{ path: '',    redirectTo: '/home',    pathMatch: 'full' },
  	{ path: 'home',    component: HomeComponent },
  	{ path: 'about',    component: AboutComponent },
  	{ path: 'contact',    component: ContactComponent },
  	{ path: 'imprint',    component: ImprintPageComponent },
  	{ path: 'gallery',    component: GalleryPageComponent },
  	{ path: 'pricelist',    component: PricePageComponent },
  	{ path: 'page/:page',    component: PageComponent },
  	{ path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(appRoutes);