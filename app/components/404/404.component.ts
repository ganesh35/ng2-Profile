import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 

@Component({
  templateUrl: 'themes/' + myGlobals.themeName + '/404.tpl.html',
  styles: [".error-template {padding: 40px 15px;text-align: center;}.error-actions {margin-top:15px;margin-bottom:15px;}.error-actions .btn { margin-right:10px; }"]
})

export class PageNotFoundComponent {
}
