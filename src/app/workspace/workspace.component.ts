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
    creatorId: "",
    messageContent: "Hallo Welt",
    timestamp: ''

  };
  messageObject!: Message;
  createdDate: Date = new Date;
  conversationObject: Conversation = new Conversation();

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

  createMessage(){
    
    this.messageJson.timestamp = this.createdDate.getTime().toString();
    this.messageJson.creatorId = this.backend.loggedInUser.customIdName
   
    this.messageObject = new Message(this.messageJson);
 
    
    this.conversationObject.participators.push(this.backend.loggedInUser.customIdName);
    this.conversationObject.messages.push(this.messageObject.toJson());
    this.backend.CreateInDatabase("conversations",this.conversationObject.toJson());
    this.backend.getDataFormDatabase('conversations');
    setTimeout(()=>{
      this.backend.idFromAddedElement = this.backend.elementArray[this.backend.elementArray.length-1].customIdName;
      this.conversationObject.customIdName = this.backend.idFromAddedElement;
      
      
    this.backend.updateElementInDatabase('conversations', this.conversationObject.toJson(),this.conversationObject.customIdName);
    this.backend.loggedInUser.allConversations.push(this.conversationObject.customIdName);
    
    
    this.backend.updateElementInDatabase('users',this.backend.loggedInUser.toJSON(), this.backend.loggedInUser.customIdName);

    },500);
    
  }

  // public insertConversationIdIntoConversationElement(){
  //   this.backend.getDataFormDatabase('conversations');
  //   setTimeout(()=>{

  //     this.backend.idFromAddedElement = this.backend.elementArray[this.backend.elementArray.length-1].customIdName;
  //     this.conversationObject.customIdName = this.backend.idFromAddedElement;
  //     console.log("hier das conversationsobjekt",this.conversationObject.toJson());
     
      
  //     this.backend.updateElementInDatabase('conversations', this.conversationObject.toJson(),this.conversationObject.customIdName);
  //   },500);
  // }


}
