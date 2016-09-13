<a name="1.0.0-beta.04"></a>
# [1.0.0-beta.04] (2016-08-31)


### Features

* **#2: EU Cookie Compliance**: Created Cookie page and implemented Cookie Concent
* **#3: 404 implementation**: 404 Page implemented
* **#4: Possibility to add more pages**: Implemented a page component to add and handle more pages when needed.





<a name="1.0.0-beta.03"></a>
# [1.0.0-beta.03] Branch : 06_Deutsch

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