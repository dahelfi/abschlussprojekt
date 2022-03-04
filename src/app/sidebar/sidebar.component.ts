import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


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
    children: [{ name: 'Mihai Bala', }, { name: 'Junus Eva', }, { name: 'Manu Mama', },],
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




  public allChannels: any[] = [];
  public allUsers: any[] = [];
  public allMessages: any[] = [];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public backend: BackendServiceService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public data: DataService,
    public router: Router,
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    // this.backend.getDataFormDatabase('ChannelsLamTest');
    // this.backend.allDocuments.forEach(channel =>{
    //   console.log('channel',channel);

    //   this.allChannels.push(channel.name)
    // })

    this.firestore
      .collection('ChannelsLamTest')
      .valueChanges({ idField: 'cid' })
      .subscribe(channel => {
        this.allChannels = channel;
      })

    this.firestore
      .collection('MessagesLamTest')
      .valueChanges({ idField: 'mid' })
      .subscribe(messages => {
        this.allMessages = messages;
      })

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
  }

  public addChannelIdInURL(cid: any){
    this.router.navigate(['user/' + this.data.me + '/channel/' + cid])
  }

}
