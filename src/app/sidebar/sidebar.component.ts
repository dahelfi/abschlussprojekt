import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  fillerNav = Array.from({ length: 10 }, (_, i) => `Nav Item ${i + 1}`);
  
  constructor() { }

  ngOnInit(): void {
  }

}
