import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  snav: any;
  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
  }

}
