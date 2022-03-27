import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { DialogAddMessageComponent } from '../dialog-add-message/dialog-add-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  user!: User;

  public allConversations: any[] = [];
  public allUsers: any[] = [];

  constructor(
    public backend: BackendServiceService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }


  ngOnInit(): void {
  }


  /**
   * function allows is to open dialog message
   */
  openDialogMessage() {
    const dialogRef = this.dialog.open(DialogAddMessageComponent);

    dialogRef.afterClosed().subscribe(result => { });
  }

  /**
   * function allows is to open dialog channel
   */
  openDialogChannel() {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);

    dialogRef.afterClosed().subscribe(result => { });
  }

   /**
   * important function that set the conversationid of the actual conversation (not a channel conversation) in the url that it can be updated
   * @param channel 
   */

  public addConversationIDInURL(username: any){
    let cId:any;
    cId = this.backend.findConversationId(this.backend.findUserIdByName(username), this.backend.loggedInUser.userId);

    this.router.navigate(['user/' + this.backend.loggedInUser.customIdName + '/conversation/' + cId])
  }


  /**
   * important function that set the conversationid of the actual conversation (channel) in the url that it can be updated
   * @param channel 
   */
  public addChannelConversationInURL(channel:any){
    this.router.navigate(['user/' + this.backend.loggedInUser.customIdName + '/conversation/' + channel.customIdName])
  }


}

