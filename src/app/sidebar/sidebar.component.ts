import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

// const 

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

  allChannels = []; //we'll get all of channels from DataBase and push in this.
  allUsers = [
    {
      name: 'Dani',
    },
    {
      name: 'Sali',
    },
    {
      name: 'Lami',
    },
  ]; //we'll get all of users from DataBase and push in this.

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
  TREE_DATA: FoodNode[] = [
    {
      name: 'Channels',
      children: [{ name: 'Angular' }, { name: 'HTML-CSS' }, { name: 'JavaScript' }],
    },
    {
      name: 'Direct messages',
      children: this.allUsers,
    },
  ];

  constructor(public backend: BackendServiceService) {
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }




}
