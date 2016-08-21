# Implimentation of Multi Lingual content

## Step #1: Installation of ng2-translate
Run the following command  from the command line:
```sh
  npm install ng2-translate --save
```

## Step #2: Changes to systemjs.config.js
```javascript
...
 var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ng2-translate': 'node_modules/ng2-translate',      // + included in the map list
  };
// packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-translate': { main: 'ng2-translate.js', defaultExtension: 'js' }   // + Included in the packages list    
  };
   ...
```
## Step #3: changes to app/app.module.ts

```javascript
...
import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';

@NgModule({
  imports:      [ 
      BrowserModule, 
      routing,
      HttpModule,
        TranslateModule.forRoot()
   ],
...
```


## Step #4: chagnes to app/app.component.ts
```javascript
...
import {TranslateService} from 'ng2-translate/ng2-translate';
...
export class AppComponent implements OnInit { 
  constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('de');
    }
}
```


## Step #5: Create language files:
File : i18n/en.json  
```json
{
    "HELLO": "hello"
}
```
Files : i18n/de.json
```json
{
    "HELLO": "hallo"
}
```





# Implementing Language Switcher
## Step #1: changes to app/app.component.ts  
```javascript
export class AppComponent implements OnInit { 
  public langList = [];
  constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('de');
    }
    ngOnInit(){
      this.langList = [
        {lang:'en', 'flag':'en.gif' },
        {lang:'de', 'flag':'de.gif' }
      ];
    }
    onLangChange(val){
      this.translate.use(val);
    }
}
```
## Step #2:  Changes to theme file
File: themes/default/theme.tpl.html

```html
<span *ngFor="let item of langList">
    <span *ngIf="currentLang==item.lang">
        <img  class="privacy_link" src="images/{{item.flag}}"  > 
    </span>
    <span *ngIf="currentLang!=item.lang" >
        <a (click)="onLangChange(item.lang)" style="cursor: pointer; cursor: hand;">
            <img  src="images/{{item.flag}}"  >
        </a>
    </span>
    &nbsp; &nbsp;
</span>
```