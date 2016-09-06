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

### PEER-DEPENDENCY UPDATES ###

* **Angular**: Updated Angular from 2.0.0-rc.5 to 2.0.0-rc.6
* **ng2-translate**: Updated ng2-translate from 2.4.1 to 2.4.3

### BREAKING CHANGES
* **sanitizeHTML.pipe**: Replaced DomSanitizerService to DomSanitizer