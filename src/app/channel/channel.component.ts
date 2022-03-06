import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  public Editor = ClassicEditor;

  public config = {
    placeholder: 'Type the content here!'
  }

  public messageContent!: string;
  msg = new Message();

  constructor(
    public data: DataService,
    public backend: BackendServiceService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  send() {
    if (this.messageContent) {
      this.msg.creatorId = this.data.me;
      this.msg.messageContent = this.messageContent;
      this.msg.timestamp = new Date();

      this.data.sendMessage(this.data.cid, this.msg.toJson());
    }
  }

  handleSubmit(event: any) {
    // if (event.keyCode === 13) {
    //   this.send();
    // }
  }

  join(){

  }
}
