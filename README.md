# ng2-Profile [1.0.0]
### A simple minimalistic MultiLingual Boiler-plate template for a perfect Profile website  
This is an Angular 2 application developed using typescript v2.0.2.

* [Technical Informatoin](#tech-info)
* [Demo](#demo)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [FAQ](#faq)


## Technical Informatoin
This program uses the following repositories:
- [Angular 2.0.0] (https://github.com/angular/angular)
- [ng2-translate 2.5.0] (https://github.com/ocombe/ng2-translate)

## Demo
Theme #1: [Demo of theme1](http://ng2-profile.theme1.batchu.org/)   
Theme #2: [Demo of theme2](http://ng2-profile.theme2.batchu.org/)   

## Features
+ PreBuilt JSON based sample profile
+ MultiLingual Support
+ Multi-Theme System:  Chnage of Theme/Template is simplified
+ JSON based data store, so no Database installation
+ Bootstrap 4 Support

## Installation
- **Step #1**: Download and extract [.zip file](https://github.com/ganesh35/ng2-Profile/archive/v1.0.0.zip)  
- **Step #2**: Extract the zip file contents to a folder (ex: profile)
- **Step #3**: (only if the folder is not in the web servcer document-root):  
   Edit the file index.html  
```html
<html>
  <head>
    <base href="/profile" />  <!-- Change this to the folder of your deployment only when it is not on document-root -->
    <meta charset="UTF-8">
```
   Change **<base href="/" />** to **<base href="/profile" />**   
   **profile** should be the folder where you have extracted your files.  
   
## Usage
Find the json file: **i18n/<lang>.json**  
Edit the content of the json file to change Logo, Caption, Menu Items, Footer Text and the complete Profile data.

## FAQ
#### How can I change  `<title>` and `meta tags`
Dynamic modification of title and meta-tags are not supported yet.   
Please open `index.html` and change them manually.

#### How to switch themes
Themes are available in the folder named `themes`  
It is possible to change between the themes which are in the `themes` folder.
**File:** `app/globals.ts` and `app/globals.js`   
if you are using npm lite-server it will re-create .js file from .ts file, otherwise plase change in the .js file
```javascript
exports.themeName = 'theme1';     // change to any available theme
```


