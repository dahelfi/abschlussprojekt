import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/models/conversations.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {

  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {

  }

  channelName!:string;
  conversationObject!:Conversation;

  public createANewChannel(){
    if(this.channelName && this.channelName.length >= 3){
      this.conversationObject = new Conversation();
      this.conversationObject.channelName = this.channelName;
      this.conversationObject.conversationId = this.backend.allConversationsArrayForUse.length + 1;
      this.conversationObject.participators.push(this.backend.loggedInUser.userId);
      this.backend.loggedInUser.allConversations.push(this.conversationObject.conversationId);
      this.backend.createInDatabase('conversations', this.conversationObject.toJson());
      this.channelName='';
    }

  }

  public addChannelToUser(channel:any){

  }





}
