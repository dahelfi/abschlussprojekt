import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { BackendServiceService } from '../backend-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Conversation } from 'src/models/conversations.class';


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

  innerWidth = window.innerWidth;
  
  threadOpen = true;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public backend: BackendServiceService, public route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  userObject!: User;

  ngOnInit(): void {


    this.route.params.subscribe((params: any) => {

    
   
        this.backend.database.collection('users').doc(params.id)
        .valueChanges({ idField: "customIdName" }).subscribe((currentUser: any)=>{
        
        this.backend.setTheLoggedInUser(new User(currentUser));
    
        
       
      
       this.backend.updateConversationPartnerArray();
       this.backend.sortAllChannelsAndConversations();
       this.backend.showAllSubsribedChannels();
       });

       
     
       

       this.backend.database.collection('conversations').doc(params.cid)
       .valueChanges({ idField: "customIdName" }).subscribe((currentConversation: any)=>{   
       this.backend.setTheActualConversation(new Conversation(currentConversation));       

       this.backend.sortAllChannelsAndConversations();
       this.backend.showAllSubsribedChannels();
       this.backend.calculateActualConversationDescription();
     

                
       this.backend.database.collection('conversations').doc(this.backend.actualThread.customIdName)
       .valueChanges({ idField: "customIdName" }).subscribe((currentThread: any)=>{

         this.backend.setTheActualThread(new Conversation(currentThread));

         
         this.backend.calculateActualThreadDescription();
       });

           



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
