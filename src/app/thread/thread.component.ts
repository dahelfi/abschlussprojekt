import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

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

  @ViewChild('editor') editorComponent!: CKEditorComponent;
 

  public getEditor() {
    // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
    // if the editor is not fully initialised yet.
    return this.editorComponent.editorInstance;
  }


  
  constructor(public backend:BackendServiceService) { }

  stopThreadWork(){
    this.backend.openThread = false;
    //this.backend.actualThread = null;
  }


  public manageMessageSending() {
    if (this.messageJson.messageContent != '') {
      console.log("das hast du eingegeben: ", this.messageJson.messageContent);
      
      this.messageJson.timestamp = new Date().getTime().toString();
      this.messageJson.creatorId = this.backend.loggedInUser.userId;
      this.messageJson.creatorUserName = this.backend.loggedInUser.userName;
      this.messageJson.messageId = 0;
      //console.log("hier ist dein message json: ", this.messageJson);
      this.messageObject = new Message(this.messageJson);
      this.messageObject.threadMessages = [];
      this.backend.actualThreadMessage.threadMessages.push(this.messageObject.toJson());
      
      this.backend.updateMessageElementInActualThreadElement(this.backend.actualThreadMessage.toJson());
    
      
      this.backend.updateElementInDatabase("conversations", this.backend.actualThread.toJson(), this.backend.actualThread.customIdName);
      this.messageJson.messageContent = '';
    }
  }

  ngOnInit(): void {
  }

}
