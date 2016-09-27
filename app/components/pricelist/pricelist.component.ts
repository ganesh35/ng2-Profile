import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
 	templateUrl: 'themes/' + myGlobals.themeName + '/pricelist.tpl.html'
 })

export class PricePageComponent {
    pageTitle: string = "PRICELIST_PAGE_HEADING";
}    
