import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DataService } from '../data.service';
import { DialogAddDirectmessageComponent } from '../dialog-add-directmessage/dialog-add-directmessage.component';

import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  user!: User;
  public cid!: any;

  public allUsers: any[] = [];
  public allChannels: any[] = [];
  public allMessages: any[] = [];

  constructor(
    public backend: BackendServiceService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public data: DataService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // CAN NOT GET CID FROM ACTIVATED:FIRSTCHILD, SO I FOUND BELOW METHOD FROM https://stackoverflow.com/questions/48977775/activatedroute-subscribe-to-first-child-parameters-observer
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: any) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route: any) => route.paramMap),
        tap((paramMap: any) => {
          this.cid = paramMap.params.cid;
        })
      ).subscribe()
  }

  ngOnInit(): void {
    this.firestore
      .collection('ChannelsLamTest')
      .valueChanges({ idField: 'cid' })
      .subscribe(collection => {
        this.allChannels = collection;
        this.data.getallChannels(this.allChannels)
      });
      
      this.firestore
      .collection('UsersLamTest')
      .valueChanges({ idField: 'uid' })
      .subscribe(collection => {
        this.allUsers = collection;
        this.data.getallUsers(this.allUsers)
      });
      
      this.firestore
      .collection('MessagesLamTest')
      .valueChanges({ idField: 'mid' })
      .subscribe(collection => {
        this.allMessages = collection;
        this.data.getallMessages(this.allMessages)
      });

    // this.route.firstChild.paramMap.subscribe(params =>{
    //   this.cid = params.get('cid');
    // })

  }

  public getCollectionFromFirebase(collectionName: string, customIdName: string, array: any) {
    this.firestore
      .collection(collectionName)
      .valueChanges({ idField: customIdName })
      .subscribe(collection => {
        array = collection;

        console.log(collectionName, array);
      });
  }

  openDialogAddChannel(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
  }
  openDialogAddDirectMessage(): void {
    const dialogRef = this.dialog.open(DialogAddDirectmessageComponent);
  }

  public addChannelIdInURL(cid: string) {
    this.router.navigate(['user/' + this.data.me + '/channel/' + cid])
  }
  public addMessagesIdInURL(mid: string) {
    this.router.navigate(['user/' + this.data.me + '/messages/' + mid])
  }

}
