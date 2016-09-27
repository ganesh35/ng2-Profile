import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
    templateUrl: 'themes/' + myGlobals.themeName + '/imprint.tpl.html'
})

export class ImprintPageComponent {
    pageTitle: string = "IMPRINT_PAGE_TITLE";
}    
