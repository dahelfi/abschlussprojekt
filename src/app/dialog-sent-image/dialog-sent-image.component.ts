import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-sent-image',
  templateUrl: './dialog-sent-image.component.html',
  styleUrls: ['./dialog-sent-image.component.scss']
})
export class DialogSentImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSentImageComponent>) { }

  ngOnInit(): void {
  }

}
