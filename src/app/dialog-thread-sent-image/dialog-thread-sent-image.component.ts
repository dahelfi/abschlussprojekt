import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';
import { DialogSentImageComponent } from '../dialog-sent-image/dialog-sent-image.component';

@Component({
  selector: 'app-dialog-thread-sent-image',
  templateUrl: './dialog-thread-sent-image.component.html',
  styleUrls: ['./dialog-thread-sent-image.component.scss']
})
export class DialogThreadSentImageComponent implements OnInit {

  messageJson = {
    messageId: 0,
    creatorId: 0,
    messageContent: "",
    timestamp: '',
    creatorUserName: '',
    imageUrl: ''

  };
  messageObject!: Message;
  

  constructor(public dialogRef: MatDialogRef<DialogSentImageComponent>, public backend:BackendServiceService) { }

  ngOnInit(): void {
  }




  public config = {
    placeholder: 'Type the content here!'
  }










  public manageMessageSending() {
   
    
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageJson.messageId = this.backend.actualConversation.messages.length + 1;
      this.messageJson.imageUrl = "image"+ this.backend.actualThread.customIdName+ "threadMessage"+ Math.floor(Math.random() * (1000000 - 0 + 1)) + 0;
      console.log("das ist die gesetzte Url: ",  this.messageJson.imageUrl);
      this.messageObject = new Message(this.messageJson);
      this.messageObject.threadMessages = [];
      this.sendFiles(this.messageObject.imageUrl, "thread");
      this.backend.actualThreadMessage.threadMessages.push(this.messageObject.toJson());
      this.messageJson.messageContent = '';
    
      this.backend.updateMessageElementInActualThreadElement(this.backend.actualThreadMessage.toJson());
     
      this.backend.updateElementInDatabase("conversations", this.backend.actualThread.toJson(), this.backend.actualThread.customIdName);
      this.messageJson.messageContent = '';
  }



  sendFiles(url:string, category:string){
    if(this.backend.image){
      this.backend.uploadFilesToStorage(url, this.backend.image, category);
      //this.backend.image = undefined;
    }
  }

}
