Ref: https://angular.io/docs/ts/latest/quickstart.html

## Step #1: Package definition and configuration files

Add the following package definition and configuration files to the project folder:

**package.json** lists packages the QuickStart app depends on and defines some useful scripts.  
**tsconfig.json** is the TypeScript compiler configuration file.  
**typings.json** identifies TypeScript definition files.  
**systemjs.config.js** is the SystemJS configuration file. 

## Step #2: Install packages
We install the packages listed in package.json using npm.  
```sh
$ npm install
```    
## Step #4: app folder
Let's create a folder to hold our application and add a super-simple Angular component.
```sh
$ mkdir app
```    
**File: app/app.component.ts**  
AppComponent is the root of the application

Every Angular app has at least one root component, conventionally named AppComponent, that hosts the client user experience. Components are the basic building blocks of Angular applications. A component controls a portion of the screen — a view — through its associated template.  

```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '&lt;h1&gt;My First Angular 2 App&lt;/h1&gt;'
})
export class AppComponent { }
``` 
**File: app/app.module.ts**  
We compose Angular apps into closely related blocks of functionality with Angular Modules. Every app requires at least one module, the root module, that we call AppModule by convention.

```javascript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
**File: app/main.ts**  
Now we need something to tell Angular to load the app module. Create the file app/main.ts
```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
```

**File: index.html**  
In the project root folder create an index.html file with appropriate content
Minimal index file Eg:
```html
<html>
  <head>
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>
```

## Step #5: lite-server (optional)
We could use lite-server from npm without needing to worry about webserver installation and configuration  
Enter the following command in a terminal window (command window in Windows):
```sh
$ npm start
```
