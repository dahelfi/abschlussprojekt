import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { DialogAddConversationComponent } from '../dialog-add-conversation/dialog-add-conversation.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


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

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddConversationComponent);

    dialogRef.afterClosed().subscribe(result => { });
  }

  public addConversationIDInURL(username: any){
    let cId:any;
    cId = this.backend.findConversationId(this.backend.findUserIdByName(username), this.backend.loggedInUser.userId);

    this.router.navigate(['user/' + this.backend.loggedInUser.customIdName + '/conversation/' + cId])
  }


}

