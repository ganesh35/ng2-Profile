# Changes over previous version:
- **Removed  "exclude" definitions**  from tsconfig.json  
	it causes npm install to fail installing all the required files
- 

# Implementation of Theme

## Pre-setup
Create folder structure for global assets such as stylesheets, images and other scripts
- **<doc-root> assets/css** : Globally acccessable style sheets
- **<doc-root> assets/img** : Globally acccessable images
- **<doc-root> assets/js** : Globally acccessable javascripts

As a foundation, Downloaded and deployed bootstrap v4.0.0-alpha.3 in to the assets folders

## Folder structure for custom theme
- **<doc-root> themes/<theme>** : Theme folder
- **<doc-root> themes/<theme>/css** : All style sheets related to theme goes here
- **<doc-root> themes/<theme>/img** : All image files related to theme goes here
- **<doc-root> themes/<theme>/theme.tpl.html** : Main template file, which defines the style and appearance of the web pages.

### Eg. 
- **<doc-root> themes/bs4/** : Theme folder
- **<doc-root> themes/bs4/css/bootstrap.min.css** : Bootstrap 4 minified stylesheet
- - **<doc-root> themes/bs4/css/theme.css** : Custom styles
- **<doc-root> themes/bs4/img/logo.png** : Logo
- **<doc-root> themes/bs4/theme.tpl.html** :   
    ```html
    <div class="container">
        <router-outlet></router-outlet>
        <footer class="footer">
            <p>&copy; Company 2016</p>
        </footer>
    </div> <!-- /container -->
    ```

## Code changes 
**File: app.component.ts**:  
```javascript
import { Component } from '@angular/core';
var theme = 'default';      // default theme
@Component({
  selector: 'my-app',
  templateUrl: '../themes/'+ theme +'/theme.tpl.html',
  styleUrls: [                                          // All css  files related to this theme goes here
  		'../themes/'+ theme +'/css/theme.css'
  	]
})
export class AppComponent {}
```
