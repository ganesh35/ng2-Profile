import { Component } from '@angular/core';
import myGlobals = require('../../globals'); 
@Component({
    templateUrl: 'themes/' + myGlobals.themeName + '/gallery.tpl.html'
 })

export class GalleryPageComponent {
    pageTitle: string = "Gallery";
    public imgList = [];
    public currentImg : any;
    public currentFolder: '';
    
    constructor() {
        this.imgList = [
            {folder:"inside",Id:"1", Title:"Art of Hair - Duesseldorf", FileName:"01.jpg", ThumbName:"t/01.jpg"},
            {folder:"inside",Id:"2", Title:"Art of Hair - Duesseldorf", FileName:"02.jpg", ThumbName:"t/02.jpg"},
            {folder:"inside",Id:"3", Title:"Art of Hair - Duesseldorf", FileName:"03.jpg", ThumbName:"t/03.jpg"},
/*            {folder:"inside",Id:"4", Title:"Art of Hair - Duesseldorf", FileName:"04.jpg", ThumbName:"t/04.jpg"},
            {folder:"inside",Id:"5", Title:"Art of Hair - Duesseldorf", FileName:"05.jpg", ThumbName:"t/05.jpg"},
            {folder:"inside",Id:"6", Title:"Art of Hair - Duesseldorf", FileName:"06.jpg", ThumbName:"t/06.jpg"},

            {folder:"team", Id:"7", Title:"Art of Hair - Duesseldorf", FileName:"01.jpg", ThumbName:"t/01.jpg"},
            {folder:"team", Id:"8", Title:"Art of Hair - Duesseldorf", FileName:"02.jpg", ThumbName:"t/02.jpg"},
            {folder:"team", Id:"9", Title:"Art of Hair - Duesseldorf", FileName:"03.jpg", ThumbName:"t/03.jpg"},
            {folder:"team", Id:"10", Title:"Art of Hair - Duesseldorf", FileName:"04.jpg", ThumbName:"t/04.jpg"},
  */  
            {folder:"women", Id:"11", Title:"Art of hair", FileName:"01.jpg", ThumbName:"t/01.jpg"},
            {folder:"women",Id:"12", Title:"Art of hair", FileName:"02.jpg", ThumbName:"t/02.jpg"},
            {folder:"women",Id:"13", Title:"Art of hair", FileName:"03.jpg", ThumbName:"t/03.jpg"},
            {folder:"women",Id:"14", Title:"Art of hair", FileName:"04.jpg", ThumbName:"t/04.jpg"},
            {folder:"women",Id:"15", Title:"Art of hair", FileName:"05.jpg", ThumbName:"t/05.jpg"},
            {folder:"women",Id:"16", Title:"Art of hair", FileName:"06.jpg", ThumbName:"t/06.jpg"},
            {folder:"women",Id:"17", Title:"Art of hair", FileName:"07.jpg", ThumbName:"t/07.jpg"},
            {folder:"women",Id:"18", Title:"Art of hair", FileName:"08.jpg", ThumbName:"t/08.jpg"},
    
            {folder:"men",Id:"19", Title:"Before", FileName:"01b.jpg", ThumbName:"t/01b.jpg"},
            {folder:"men",Id:"20", Title:"After", FileName:"01a.jpg", ThumbName:"t/01a.jpg"},
            {folder:"men",Id:"21", Title:"Before", FileName:"02b.jpg", ThumbName:"t/02b.jpg"},
            {folder:"men",Id:"22", Title:"After", FileName:"02a.jpg", ThumbName:"t/02a.jpg"},
    
            {folder:"outside",Id:"23", Title:"Art of Hair - Duesseldorf", FileName:"01.jpg", ThumbName:"t/01.jpg"},
            {folder:"outside",Id:"24", Title:"Art of Hair - Duesseldorf", FileName:"02.jpg", ThumbName:"t/02.jpg"},
            {folder:"outside",Id:"25", Title:"Art of Hair - Duesseldorf", FileName:"03.jpg", ThumbName:"t/03.jpg"},
   
        ];

    }
    showImg(_item){
        this.currentImg = _item;
    }
    hideImg(){
        this.currentImg = null;
    }    
    showFolder(_folder){
        this.currentFolder = _folder;
    }
}    
