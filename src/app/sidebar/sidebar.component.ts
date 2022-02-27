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
  user!:User;

  
  

  allChannels = Array.from({ length: 10 }, (_, i) => `# Channel ${i + 1}`);
  allUsers = Array.from({ length: 10 }, (_, i) => `nickname ${i + 1}`);

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

  constructor(public backend:BackendServiceService) {
    this.dataSource.data = TREE_DATA;
  }
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }




}
