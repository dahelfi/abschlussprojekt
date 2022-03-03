import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  channel = new Channel()
  loading = false;

  constructor(
    public firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddChannelComponent>,
    public data: DataService,
  ) { }

  ngOnInit(): void {
    this.putMeIntoMembers();
  }

  public putMeIntoMembers() {
    this.channel.members.push(this.data.me)
  }

  saveChannel() {

    this.loading = true;

    this.firestore
      .collection('ChannelsLamTest')
      .add(this.channel.toJSON())
      .then(result => {
        // console.log('channel in firestore added', result);
        this.loading = false;
        this.dialogRef.close();
      })
  }
}
