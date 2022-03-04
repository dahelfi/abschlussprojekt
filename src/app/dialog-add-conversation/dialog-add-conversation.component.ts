import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-add-conversation',
  templateUrl: './dialog-add-conversation.component.html',
  styleUrls: ['./dialog-add-conversation.component.scss']
})
export class DialogAddConversationComponent implements OnInit {

  static conversationsIdCounter = 0;
  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
    console.log("hier dein eingeloggter user",this.backend.loggedInUser);
    
  }

  public addConversationwithUser(userElement:any){
   this.backend.loggedInUser.allConversations.push(userElement.userId);
   
  }

}
