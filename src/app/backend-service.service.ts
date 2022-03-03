import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  public allDocuments: any[] = [];
  public me!: any;
  public idFromAddedElement!: string;


  constructor(public database: AngularFirestore) { }

  public CreateInDatabase(collection: string, objectToSave: any) {

    this.database
      .collection(collection)
      .add(objectToSave)
      .then((result: any) => {
        console.log('Adding finished', result);
      });

  }


  public getDataFormDatabase(collection: string) {
    this.database
      .collection(collection)
      .valueChanges({ idField: "customIdName" })
      .subscribe((collection: any) => {
        collection.forEach((document: any) => {
          this.allDocuments.push(document);
        });
      });
  }


  public updateElementInDatabase(collection: string, objectToUpdate: any, elementId: string) {

    this.database
      .collection(collection)
      .doc(elementId)
      .update(objectToUpdate)
      .then((result) => {
        console.log("update finished", result);
      });

  }


  /**
   * this method puts all infos of the user, that is logged in currently.
   * @param loggedInUser is all inofs of the user, that is logged in currently.
   */
  public setMe(loggedInUser: any) {
    this.me = loggedInUser;
  }

  public setMeByUid(uid: any) {
    this.database
      .collection('UsersLamTest')
      .doc(uid)
      .valueChanges()
      .subscribe(user => {
        this.me = new User(user); //altanative: this.me = user;
      })
  }

}
