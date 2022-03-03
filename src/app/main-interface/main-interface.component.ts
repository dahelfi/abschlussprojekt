import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { BackendServiceService } from '../backend-service.service';


@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.scss']
})


export class MainInterfaceComponent implements OnInit, AfterViewInit, OnDestroy {

  // RESPONSIVE SIDENAV 
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  // RESPONSIVE SIDENAV

  // PASSING DATA WITH SIDEBAR-COMPONENT
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild(ToolbarComponent) toolbar!: ToolbarComponent;
  @ViewChild('snav') snav!: ElementRef;
  // PASSING DATA WITH SIDEBAR-COMPONENT

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public backend:BackendServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.backend.database.
    collection('conversations')
    .valueChanges({idField:"customIdName"})
    .subscribe((conversations:any)=>{
    this.backend.allConversationsArrayForUse=conversations;
    console.log("das hier habe ich für dich in allconarray gespeichert", this.backend.allConversationsArrayForUse);
    
    });
    this.backend.database.
    collection('users')
    .valueChanges({idField:"customIdName"})
    .subscribe((users:any)=>{
    this.backend.allUsersArrayForUse = users;

    });
  }

  ngAfterViewInit(): void {
    this.toolbar.snav = this.snav;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
