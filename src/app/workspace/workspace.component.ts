import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BackendServiceService } from '../backend-service.service';
import { DataPassingService } from '../data-passing.service';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {

  demoUsers = [
    {
      name: 'Dani',
      userID: 'LQBei11QVGWJckeXk63K',
      messageID: 'id',
    },
    {
      name: 'Sali',
      userID: 'Salislslslslslslslsl',
      messageID: 'id',
    },
    {
      name: 'Lami',
      userID: 'Lamilalalalalalalala',
      messageID: 'id',
    },
  ]

  demoMessages = [
    {timeStamp:'1645912000', userID: 'LQBei11QVGWJckeXk63K', messageContent: 'i need to talk with you can we meet ?' },
    {timeStamp:'1645913000', userID: 'Salislslslslslslslsl', messageContent: 'ya sure i will come around 12' },
    {timeStamp:'1645914000', userID: 'Lamilalalalalalalala', messageContent: 'griaß euch.' },
    {timeStamp:'1645915000', userID: 'LQBei11QVGWJckeXk63K', messageContent: 'thank you so much' },
    {timeStamp:'1645916000', userID: 'Salilslslslslslslsls', messageContent: 'hey am sorry did you waited long' },
    {timeStamp:'1645917000', userID: 'Lamilalalalalalalala', messageContent: 'ha ha ha' },
    {timeStamp:'1645918000', userID: 'LQBei11QVGWJckeXk63K', messageContent: 'hey its ok' },
    {timeStamp:'1645919000', userID: 'Salilslsllslslslslsl', messageContent: 'hmm…why you called me?' },
    {timeStamp:'1645920000', userID: 'Lamilalalalalalalala', messageContent: 'tschüss.' },
  ]

  public Editor = ClassicEditor;

  public config = {
    placeholder: 'Type the content here!'
  }

  constructor(public dataPassingService: DataPassingService) { 
  }

  ngOnInit(): void {
    console.log(this.dataPassingService.mycustomIdName);
  }

}
