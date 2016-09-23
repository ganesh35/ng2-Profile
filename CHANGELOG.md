<a name="1.0.0-beta.05"></a>
# [1.0.0-beta.05] (2016-09-23)

### Upgrade from Angular 2.0.0-rc.6 to Angular 2.0.0

### Code Refactoring

* **typescript:** Upgrade from "typescript": "^1.8.10" to "typescript": "^2.0.2",
* **compiler-cli:** "@angular/compiler-cli": "0.6.0" removed from package.json
* **Angular update:** "@angular/*": "2.0.0-rc.6" upgraded to "2.0.0" 
* **ng2-translate:** "ng2-translate": "^2.4.3" upgraded to "2.5.0" 


<a name="1.0.0-beta.04"></a>
# [1.0.0-beta.04] (2016-09-13)

### Features
* **[#1: Add / Remove languages](https://github.com/ganesh35/ng2-Profile/issues/1)**: Adding / removing content languages simplified.
* **[#2: EU Cookie Compliance](https://github.com/ganesh35/ng2-Profile/issues/2)**: Created Cookie page and implemented Cookie Concent
* **#[3: 404 implementation](https://github.com/ganesh35/ng2-Profile/issues/3)**: 404 Page implemented
* **[#4: Possibility to add more pages](https://github.com/ganesh35/ng2-Profile/issues/4)**: Implemented a page component to add and handle more pages when needed.

### Bug Fixes
* **[#6: Active language flag should not be clickable](https://github.com/ganesh35/ng2-Profile/issues/6)**: Active language has been fixed in app.component.ts


<a name="1.0.0-beta.03"></a>
# [1.0.0-beta.03]

### Bug Fixes
* **Logo Link:** Fixed logo link reload problem in theme.tpl.html
* **theme.css:** Fixed failed loading of theme.css in index.html

### Code Refactoring

* **i18n:** Removed all unwanted entries in the language files
* **images/:** Removed all unwanted image files


### Features

* **Deutsch**: Deutsch language support included
* **Theme**: Included support to Theme system
* **Themes**: Using globals.ts variable themeName we can set the theme.  Available themes : theme1, theme2
* **globals.ts**: A new globals file has been created for the global variables

### PEER-DEPENDENCY UPDATES ###
* **Angular**: Updated Angular from 2.0.0-rc.5 to 2.0.0-rc.6
* **ng2-translate**: Updated ng2-translate from 2.4.1 to 2.4.3

### BREAKING CHANGES
* **sanitizeHTML.pipe**: Replaced DomSanitizerService to DomSanitizer
* **theme:** All component *.tpl.html files have been moved to themes/<theme> folder and pointed from the component using global variable themeName