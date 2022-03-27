import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-sent-image',
  templateUrl: './dialog-sent-image.component.html',
  styleUrls: ['./dialog-sent-image.component.scss']
})
export class DialogSentImageComponent implements OnInit {

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


  /**
   * in this function we are sending the image and the message 
   */
  public manageMessageSending() {
   
    
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageJson.messageId = this.backend.actualConversation.messages.length + 1;
      this.messageJson.imageUrl = "image"+ this.backend.actualConversation.customIdName+ this.backend.actualConversation.messages.length + 1;
      console.log("das ist die gesetzte Url: ",  this.messageJson.imageUrl);
      this.messageObject = new Message(this.messageJson);
      this.messageObject.threadMessages = [];
      this.backend.actualConversation.messages.push(this.messageObject.toJson());
      this.messageJson.messageContent = '';
    
      this.sendFiles(this.messageObject.imageUrl, 'message');
      this.backend.updateElementInDatabase("conversations", this.backend.actualConversation.toJson(), this.backend.actualConversation.customIdName);
 
  }


  /**
   * with this function we are sending the files through the backend function to the firebase storage
   * @param url 
   * @param category 
   */

  sendFiles(url:string, category:string){
    if(this.backend.image){
      this.backend.uploadFilesToStorage(url, this.backend.image, category);
      //this.backend.image = undefined;
    }
  }


}
