import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-add-directmessage',
  templateUrl: './dialog-add-directmessage.component.html',
  styleUrls: ['./dialog-add-directmessage.component.scss']
})
export class DialogAddDirectmessageComponent implements OnInit {

  constructor(
    public data: DataService,
  ) { }

  ngOnInit(): void {
  }

}
