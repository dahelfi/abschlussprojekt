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


  /**
   * with this function we can create a new channel
   */
  public createANewChannel(){
    if(this.channelName && this.channelName.length >= 3){
      this.conversationObject = new Conversation();
      this.conversationObject.channelName = this.channelName;
      this.conversationObject.conversationId = this.backend.allConversationsArrayForUse.length + 1;
      this.conversationObject.participators.push(this.backend.loggedInUser.userId);
      this.backend.loggedInUser.allConversations.push(this.conversationObject.conversationId);
      this.backend.createInDatabase('conversations', this.conversationObject.toJson());
      this.backend.updateElementInDatabase('users', this.backend.loggedInUser.toJSON(), this.backend.loggedInUser.customIdName);
      this.channelName='';
    }

  }

  /**
   * with this function we can add a channel to the loggedInUser 
   * @param channel 
   */
  public addChannelToUser(channel:any){
    this.conversationObject = new Conversation(channel);
    if(!this.backend.checkIfChannelAlreadySubscribed(this.conversationObject.conversationId)){

      this.conversationObject.participators.push(this.backend.loggedInUser.userId);
      this.backend.loggedInUser.allConversations.push(this.conversationObject.conversationId);
      this.backend.updateElementInDatabase("users",this.backend.loggedInUser.toJSON(), this.backend.loggedInUser.customIdName);
      this.backend.updateElementInDatabase("conversations", this.conversationObject.toJson(), this.conversationObject.customIdName);

    }
 

  }





}
