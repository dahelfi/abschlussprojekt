import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Conversation } from 'src/models/conversations.class';
import { Message } from 'src/models/message.class';
import { BackendServiceService } from '../backend-service.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public Editor = ClassicEditor;
  
  public config = {
    placeholder: 'Type the content here!'
  }

  constructor(
    public backend:BackendServiceService,
    public data: DataService,
    public route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }


  public manageMessageSending(){}
}
