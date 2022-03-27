import { Component, OnInit } from '@angular/core';
import { user } from 'rxfire/auth';
import { Conversation } from 'src/models/conversations.class';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-add-message',
  templateUrl: './dialog-add-message.component.html',
  styleUrls: ['./dialog-add-message.component.scss']
})
export class DialogAddMessageComponent implements OnInit {

  
  conversationObject!:Conversation;
  constructor(public backend:BackendServiceService) { }
  userObject!:User;

  ngOnInit(): void {
    
    
  }
  /**
   * with this function we are adding an conversation between to participants
   * @param userElement 
   */

  public addConversationwithUser(userElement:any){
    if(!this.backend.findConversationId(this.backend.loggedInUser.userId, userElement.userId)){

   this.conversationObject = new Conversation;
   this.conversationObject.conversationId = this.backend.allConversationsArrayForUse.length+1;
   this.backend.loggedInUser.allConversations.push(this.conversationObject.conversationId);
   this.conversationObject.participators.push(userElement.userId);
   this.conversationObject.participators.push(this.backend.loggedInUser.userId);

   this.userObject = new User(userElement);
   this.userObject.allConversations.push(this.conversationObject.conversationId)
   this.backend.createInDatabase('conversations', this.conversationObject.toJson());
   this.backend.updateElementInDatabase('users', this.backend.loggedInUser.toJSON(), this.backend.loggedInUser.customIdName);
   this.backend.updateElementInDatabase('users', this.userObject.toJSON(), this.userObject.customIdName);


    }
   
   
   
  }

}
