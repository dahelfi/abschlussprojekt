import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public me!: any;
  public cid!: string;
  public mid!: string;
  public allUsers: any[] = [];
  public allMessages: any[] = [];
  public allChannels: any[] = [];
  public currentChannel = new Channel();

  constructor(
    public firebase: AngularFirestore,
  ) { }

  /**
   * this function puts info of currentUser in variable 'me' to use on every component
   * @param currentUser info of currentUser, that is logged in.
   */
  public setMe(currentUser: any) {
    this.me = currentUser;
  }
  public getcid(x: string) {
    this.cid = x;
  }
  public getmid(x: string) {
    this.mid = x;
  }

  public getallUsers(x: any) {
    this.allUsers = x;
  }
  public getallMessages(x: any) {
    this.allMessages = x;
  }
  public getallChannels(x: any) {
    this.allChannels = x;
  }

  public getcurrentChannelMessages(x: any) {
    console.log('get messages');
    
    this.allChannels.forEach(channel => {
      if (channel['cid'].includes(x)) {
        this.currentChannel.messages = channel.messages;
        this.currentChannel.members = channel.members;
        this.currentChannel.name = channel.name;
      }
    })
  }

  public sendMessage(cid: string, msg: any) {
    this.currentChannel.messages.push(msg)
    this.firebase
      .collection('ChannelsLamTest')
      .doc(cid)
      .update(this.currentChannel.toJSON())
      .then((result: any) => {
        console.log('Updating finished');
      });
  };


}
