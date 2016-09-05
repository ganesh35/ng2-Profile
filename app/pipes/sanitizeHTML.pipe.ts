import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizationService ,SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHTML'
})
export class SanitizeHTML implements PipeTransform  {
   constructor(private _sanitizer: DomSanitizationService ){}  
   transform(v: string) {
      return this._sanitizer.bypassSecurityTrustHtml(v); 

      //return v;
   } 
}
