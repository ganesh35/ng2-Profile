import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'starRating'})
export class StarRatingPipe implements PipeTransform {
  transform(value: number, icon:string, iconClass: string, max:number): string {
  	if (max == undefined ) { max = 6; }
	if (iconClass == undefined ) {iconClass = "text-danger";} 
	if (icon == undefined ) { icon = "fa fa-asterisk"; }


	//var html = '<i class="'+ iconClass + ' ' + icon +'">'+value+'</i>';
	var html = '';
	
  	for(var i=1; i<= max; i++){
  		html = html + '<i class="'+ icon;
  		if (value > 1 ) {
  			html = html + ' ' + iconClass;
  			value --;
  		}
  		html = html + '"></i>\n';
  	}
  	//console.log(html);
  	return html;
  }
}
