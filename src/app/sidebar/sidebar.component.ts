import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { DialogAddConversationComponent } from '../dialog-add-conversation/dialog-add-conversation.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Channels',
    children: [{ name: 'Angular' }, { name: 'HTML-CSS' }, { name: 'JavaScript' }],
  },
  {
    name: 'Direct messages',
    children: [
      {
        name: 'Mihai Bala',
        // children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Junus Eva',
        // children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
      {
        name: 'Manu Mama',
        // children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


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

  public addConversationIDInURL(cid: any){
    this.router.navigate(['user/' + this.backend.loggedInUser.customIdName + '/conversation/' + cid])
  }


}

