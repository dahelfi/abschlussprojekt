import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { DialogAddDirectmessageComponent } from '../dialog-add-directmessage/dialog-add-directmessage.component';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  user!: User;

  public allUsers: any[] = [];
  public allChannels: any[] = [];
  public allMessages: any[] = [];

  constructor(
    public backend: BackendServiceService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public data: DataService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('ChannelsLamTest')
      .valueChanges({ idField: 'cid' })
      .subscribe(collection => {
        this.allChannels = collection;
      });
    this.firestore
      .collection('UsersLamTest')
      .valueChanges({ idField: 'uid' })
      .subscribe(collection => {
        this.allUsers = collection;
      });
    this.firestore
      .collection('MessagesLamTest')
      .valueChanges({ idField: 'mid' })
      .subscribe(collection => {
        this.allMessages = collection;
      });
  }

  public getCollectionFromFirebase(collectionName: string, customIdName: string, array: any) {
    this.firestore
      .collection(collectionName)
      .valueChanges({ idField: customIdName })
      .subscribe(collection => {
        array = collection;

        console.log(collectionName,array);
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
