import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { BackendServiceService } from '../backend-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';


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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public backend: BackendServiceService, public route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  userObject!: User;

  ngOnInit(): void {
    this.backend.setTheLoggedInUserById();

    this.route.params.subscribe((params: any) => {

        this.backend.database.collection('users').doc(params.id)
        .valueChanges({ idField: "customIdName" }).subscribe((currentUser: any)=>{
        console.log("hier bekommst du currenuser: ", currentUser); 
        this.backend.loggedInUser = new User(currentUser) as User;
       
       console.log("hier der geupdatete User: "+this.backend.loggedInUser);
       });
      
    })


  }

  ngAfterViewInit(): void {
    this.toolbar.snav = this.snav;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
