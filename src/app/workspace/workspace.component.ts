import { Component, Input, OnInit } from '@angular/core';
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
    messageId: 0,
    creatorId: 0,
    messageContent: "",
    timestamp: '',
    creatorUserName: '',
    imageUrl: ''

  };
  messageObject!: Message;
  conversationObject!: Conversation;
  showAllConversation: string[] = [];
  flag = false;


  public config = {
    placeholder: 'Type the content here!'
  }

  @Input() threadOpen?: boolean;

  constructor(public backend: BackendServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * with this function we can select the image we want to sent
   * @param e 
   */
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


  /**
   * with this function we can add a message in a thread
   * @param messageElement 
   */

  public openMessageInThread(messageElement:any){
    
    
    this.backend.setTheActualThread(new Conversation(this.backend.actualConversation));
    this.backend.getAllImagesThread();
    this.backend.setTheActualThreadMessage(new Message(this.backend.findMessageObjektByIdInArray(messageElement.messageId, this.backend.actualThread.messages)));
    this.backend.allowUpdateThreadDescription = true;
    this.backend.calculateActualThreadDescription();
    this.backend.openThread = true;
    this.backend.allowUpdateThreadDescription = false;

  }


  /**
   * with this function we can manage the message sending 
   * @param messageElement 
   */

  public manageMessageSending() {
    if (this.messageJson.messageContent != '' && this.messageJson.messageContent.length >=1) {
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageJson.messageId = this.backend.actualConversation.messages.length + 1;
      this.messageObject = new Message(this.messageJson);
      this.messageObject.threadMessages = [];
      this.backend.actualConversation.messages.push(this.messageObject.toJson());
      this.messageJson.messageContent = '';
    
      
      this.backend.updateElementInDatabase("conversations", this.backend.actualConversation.toJson(), this.backend.actualConversation.customIdName);
    }
  }




}
