import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user!:User;
  constructor(public firestore: AngularFirestore) { }
  

  ngOnInit(): void {
  }

  saveUser(){
    this.user = new User();
    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result: any) => {
      
      console.log('Adding user finished', result);
     
    });
  }

}
