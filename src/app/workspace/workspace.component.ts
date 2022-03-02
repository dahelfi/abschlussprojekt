import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Conversation } from 'src/models/conversations.class';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public Editor = ClassicEditor;
  messageJson={
    creatorId: 0,
    messageContent: "",
    timestamp: ''

  };
  messageObject!: Message;
  conversationObject!: Conversation;
  testArray:string[] = []; 
  flag = false;
 

  public config = {
    placeholder: 'Type the content here!'
  }

  fillerContent = Array.from(
    { length: 8 },
    () =>
      `Lorem`,
  );

  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
  }

  public manageMessageSending(){
    if(!this.flag){
      this.createFirstConversation();
    }else{
      this.sendFurtherMessages();
    }
  }

  public createFirstConversation(){
  
    this.messageJson.timestamp = new Date().getTime().toString();
    this.messageJson.creatorId = this.backend.loggedInUser.userId;
    this.messageObject = new Message(this.messageJson);
    this.conversationObject = new Conversation();
    this.conversationObject.participators.push(this.backend.loggedInUser.userId);
    this.conversationObject.messages.push(this.messageObject.toJson());
    this.backend.allConversationsForDb.allConversationsArray.push(this.conversationObject.toJson())
    
    this.backend.updateAllConversations();

    this.messageJson.messageContent = '';
    this.flag = true;
    
  }


  /**
   * here we can set the actuall conversationelement
   * @param conversationJson 
   */
  public setConversationById(conversationJson:any){
    this.backend.actualConversation = new Conversation(conversationJson.allConversationsArray[0])// hier wird die id auch hardgecoded soll nachher dynamisch sein
  }

  /**
   * mit dieser methode kann man weitere nachrichten schicken wenn die erste bereits geschickt ist und das element bereits kreeiert ist
   */
  public sendFurtherMessages(){
    this.setConversationById(this.backend.allConversationsArrayForUse[0]);
    this.messageJson.timestamp = new Date().getTime().toString();
    this.messageJson.creatorId = this.backend.loggedInUser.userId;
    this.messageObject = new Message(this.messageJson);
    this.backend.actualConversation.messages.push(this.messageObject.toJson());
    this.updateConversation( this.backend.actualConversation.toJson());
    this.messageJson.messageContent = '';

  }

  /**
   * updates an exicting conversationselement when one message is added
   * @param conversationElement 
   */
  public updateConversation(conversationElement:any){
    for (let i = 0; i < this.backend.allConversationsForDb.allConversationsArray.length; i++) {
       if(this.backend.allConversationsForDb.allConversationsArray[i].conversationId == conversationElement.conversationId){
        this.backend.allConversationsForDb.allConversationsArray[i] = conversationElement;
       }
      
      }
    this.backend.updateAllConversations();

  }

}
