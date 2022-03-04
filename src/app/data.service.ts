import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  public me!: any;
  public allChannels: any[] = [];
  public allUsers: any[] = [];
  public allMessages: any[] = [];

  constructor(
    public firebase: AngularFirestore,
  ) { 
  }

  /**
   * this function puts info of currentUser in variable 'me' to use on every component
   * @param currentUser info of currentUser, that is logged in.
   */
  public setMe(currentUser: any) {
    this.me = currentUser;
  }

  public getallUsers(x: any){
    this.allUsers = x;
  }
  public getallChannels(x: any){
    this.allChannels = x;
  }
  public getallMessages(x: any){
    this.allMessages = x;
  }

}
