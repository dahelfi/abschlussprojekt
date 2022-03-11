import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-dialog-sent-image',
  templateUrl: './dialog-sent-image.component.html',
  styleUrls: ['./dialog-sent-image.component.scss']
})
export class DialogSentImageComponent implements OnInit {

  

  constructor(public dialogRef: MatDialogRef<DialogSentImageComponent>, public backend:BackendServiceService) { }


  sendFiles(){
    console.log("sendFiles wird ausgeführt");
    if(this.backend.image){
      this.backend.uploadFilesToStorage('/test/', this.backend.image);
    }
  }

  ngOnInit(): void {
  }

}
