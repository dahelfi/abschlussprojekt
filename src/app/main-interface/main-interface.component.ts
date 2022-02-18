import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';


@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.scss']
})


export class MainInterfaceComponent implements OnInit, AfterViewInit, OnDestroy {

  // RESPONSIVE SIDENAV 
  mobileQuery: MediaQueryList;

  fillerContent = Array.from(
    { length: 10 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;
  // RESPONSIVE SIDENAV

  // PASSING DATA WITH SIDEBAR-COMPONENT
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild(ToolbarComponent) toolbar!: ToolbarComponent;
  @ViewChild('snav') snav!: ElementRef;
  // PASSING DATA WITH SIDEBAR-COMPONENT

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toolbar.snav = this.snav;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
