import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Conversation } from 'src/models/conversations.class';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';
import { DialogSentImageComponent } from '../dialog-sent-image/dialog-sent-image.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public Editor = ClassicEditor;
  messageJson = {
    creatorId: 0,
    messageContent: "",
    timestamp: '',
    creatorUserName: '',

  };
  messageObject!: Message;
  conversationObject!: Conversation;
  showAllConversation: string[] = [];
  flag = false;


  public config = {
    placeholder: 'Type the content here!'
  }

  fillerContent = Array.from(
    { length: 8 },
    () =>
      `Lorem`,
  );

  constructor(public backend: BackendServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  onFileSelected(e:any){
    if(e.target.files){
      this.backend.image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.backend.image);
      reader.onload = (event: any)=>{
        this.backend.url = event.target.result;
      }

     
    }

    const dialogRef = this.dialog.open(DialogSentImageComponent);
  }


  public manageMessageSending() {
    if (this.messageJson.messageContent != '' && this.messageJson.messageContent.length >=1) {
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageObject = new Message(this.messageJson);
      this.messageObject.threadMessages = [];
      this.backend.actualConversation.messages.push(this.messageObject.toJson());
      this.messageJson.messageContent = '';
      console.log("message sending wird ausgeführt");
      
      this.backend.updateElementInDatabase("conversations", this.backend.actualConversation.toJson(), this.backend.actualConversation.customIdName);
    }
  }



  /**
   * mit dieser methode kann man weitere nachrichten schicken wenn die erste bereits geschickt ist und das element bereits kreeiert ist


  /**
   * updates an exicting conversationselement when one message is added
   * @param conversationElement 
   */
  // public updateConversation(conversationElement:any){
  //   for (let i = 0; i < this.backend.allConversationsForDb.allConversationsArray.length; i++) {
  //      if(this.backend.allConversationsForDb.allConversationsArray[i].conversationId == conversationElement.conversationId){
  //       this.backend.allConversationsForDb.allConversationsArray[i] = conversationElement;
  //      }

  //     }
  //   this.backend.updateAllConversations();

  // }

}
