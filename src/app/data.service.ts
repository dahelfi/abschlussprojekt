import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public me!: any;

  constructor() { }

  /**
   * this function puts info of currentUser in variable 'me' to use on every component
   * @param currentUser info of currentUser, that is logged in.
   */
  public setMe(currentUser: any){
    this.me = currentUser;
  }
}
