## Release notes

### What is ng2-Profile?
ng2-Profile is a simple minimalist Multi-lingual **Boiler-plate template** for a perfect Profile website.  

This is an Angular 2 application developed using typescript v2.0.2.

### Why should I use it.  
You can use it for many reasons but not for every reason.   
For all the below reasons you can download this program and use it as a Boiler-plate tempalte.
- If you want to create a website using Angular 2
- If you want to create a profile / CV website
- If you want to create a Static HTML website
- If you want to create a Front-end website which retreives data from a RESTful service.

### What technical information should I know?
This program uses the following repositories:
- [Angular 2.0.0] (https://github.com/angular/angular)
- [ng2-translate 2.5.0] (https://github.com/ocombe/ng2-translate)

### Where can I see the demo?
This program comes with 2 in-built themes:
- Theme #1: [Demo of theme1](http://ng2-profile.theme1.batchu.org/)   
- Theme #2: [Demo of theme2](http://ng2-profile.theme2.batchu.org/) 

### Pros and Cons?
**Pros**
- Pure static content, can be deployed on any Content Delivery Network
- No need of Server side Scripts
- Multilingual Support 
- MultiTheme Support 
- Bootstrap 4 Included
- Adding, Editing and removing pages can be done without writing much code
- Works across All Platforms
- Faster loading and rendering

**Cons**
- This program is not using any Database
- At the moment Bootstrap 4 loads by default, need to be fixed based on the given Theme
- Static Menu items

### How can I install it?
- **Step #1**: Download and extract [.zip file](https://github.com/ganesh35/ng2-Profile/archive/ng2-Profile1.0.0.zip)  
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
   
### Where can I change the content?
Find the json file: **i18n/<lang>.json**  
Edit the content of the json file to change Logo, Caption, Menu Items, Footer Text and the complete Profile data.

### How can I change  `<title>` and `meta tags`
Dynamic modification of title and meta-tags are not supported yet.   
Please open `index.html` and change them manually.


#### How to switch themes
Themes are available in the folder named `themes`  
It is possible to change between the themes which are in the `themes` folder.
**File:** `app/globals.ts` and `app/globals.js`   
if you are using npm lite-server it will re-create .js file from .ts file, otherwise plase change in the .js file
```javascript
exports.themeName = 'theme1'; 
```

change to any available theme