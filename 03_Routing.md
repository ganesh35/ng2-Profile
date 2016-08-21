# Implementation of Routing 
## Step #1: Folder structure and basic components  
Create Folder:  app/components  
Components to create  
app/components/about  
	- about.component.ts
```javascript
	import { Component } from '@angular/core';
	@Component({
	  template: '<h3>About page</h3>'
	})
	export class AboutComponent {
	}
```
app/components/contact  
	- contact.component.ts  
app/components/home  
	- home.component.ts  
app/components/profile  
	- profile.component.ts  

## Step #2: Add components to app.module.ts
```javascript
...
import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';
...
declarations: [ AppComponent, HomeComponent, AboutComponent, ProfileComponent, ContactComponent ],
...
```

## Step #3: Create a new file app.routing.ts
File contents:
...

## Step #4: include app.routing to app.module
```javascript
...
import {routing} from './app/app.routing';
...
imports:      [ BrowserModule, routing ],
...
```

##  Step #5: Add base href to index.html

```html
<head>
  <base href="/">
```

##  Step #6: create router-outlet   
File : theme.tpl.html  
Include router-outline where the page content goes
```html
<body>
...
<router-outlet></router-outlet>
...
</body>
...
```

## Step #7: Create menu items  
File: themes/default/theme.tpl.html  
```html
...
<a class="nav-link" routerLink="/home" routerLinkActive="active"><i class="glyphicon glyphicon-home"></i> Home </a>
...
```