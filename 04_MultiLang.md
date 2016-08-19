Multi Lingual content
Step #1 :Install ng2-translate 
npm install ng2-translate --save


Step #2: include in the map list of systemjs.config.js
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'ng2-translate':              'node_modules/ng2-translate',				// + Included in the map list
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };



  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-translate': { main: 'ng2-translate.js', defaultExtension: 'js' }		// + Included in the packages list		
  };


Step #3: Changes to app.module.ts

..
import {TranslateModule, TranslateLoader} from 'ng2-translate/ng2-translate';
import {  Http } from '@angular/http';
..
 imports:      [ BrowserModule, routing, 
  		TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
          deps: [Http]
        })

  ],
  exports: [TranslateModule],
  ..


