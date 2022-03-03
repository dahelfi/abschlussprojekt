import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  snav: any;

  constructor(
    public backend: BackendServiceService,
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    public data: DataService,
  ) { }

  public uid: any;
  public userName: any;

  ngOnInit(): void {
    /**
     * in the case the page main-interface reloads sudently, 'me' in backend-service will be undefined
     * but userId is still on local URL,
     * so, two functions below will get 'me' back 
     */
    this.getIdFromRoute()
    this.getUserFromFirebaseById()
    this.data.setMe(this.uid)
  }

  getIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('id');
    });
  }

  getUserFromFirebaseById() {
    if (this.uid) {
      //this.backend.setMeByUid(this.uid)
      // this.userName = this.backend.me.userName
      // console.log(this.backend.me);

      this.firestore
        .collection('UsersLamTest')
        .doc(this.uid)
        .valueChanges()
        .subscribe((user:any) => {
          this.userName = user.userName
        })
    } else {
      //throw ERROR
    }
  }

}
