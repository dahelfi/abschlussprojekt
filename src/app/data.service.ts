import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public me!: any;
  public allChannels: any[] = [];

  constructor(
    public firebase: AngularFirestore,
  ) { }

  /**
   * this function puts info of currentUser in variable 'me' to use on every component
   * @param currentUser info of currentUser, that is logged in.
   */
  public setMe(currentUser: any){
    this.me = currentUser;
  }

  public getChannelID(){
    this.firebase
      .collection('ChannelsLamTest')
      .valueChanges({ idField: "customIdName" })
      .subscribe((collection: any) => {
        collection.forEach((document: any) => {
          this.allChannels.push(document);
        });
      });}
}
