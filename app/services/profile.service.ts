import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
	private _profile: any;
  	get(){
  		return this._profile;
  	}
  	set(profile:any){
  		this._profile = profile;
  	}
}
