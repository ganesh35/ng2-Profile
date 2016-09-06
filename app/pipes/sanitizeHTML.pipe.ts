import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer ,SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHTML'
})
export class SanitizeHTML implements PipeTransform  {
   constructor(private _sanitizer: DomSanitizer ){}  
   transform(v: string) {
      return this._sanitizer.bypassSecurityTrustHtml(v); 
   } 
}
