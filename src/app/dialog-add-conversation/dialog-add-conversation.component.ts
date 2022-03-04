import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/models/conversations.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-add-conversation',
  templateUrl: './dialog-add-conversation.component.html',
  styleUrls: ['./dialog-add-conversation.component.scss']
})
export class DialogAddConversationComponent implements OnInit {

  static conversationsIdCounter = 0;
  conversationObject!:Conversation;
  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
    console.log("hier dein eingeloggter user",this.backend.loggedInUser);
    
  }

  public addConversationwithUser(userElement:any){
   this.backend.loggedInUser.allConversations.push(userElement.userId);
   this.conversationObject = new Conversation;
   this.conversationObject.conversationId = ++DialogAddConversationComponent.conversationsIdCounter;
   this.conversationObject.participators.push(userElement.userId);
   this.conversationObject.participators.push(this.backend.loggedInUser.userId);

   this.backend.createInDatabase('conversations', this.conversationObject.toJson());
   this.backend.updateElementInDatabase('users', this.backend.loggedInUser.toJSON(), this.backend.loggedInUser.customIdName);
   
  }

}
