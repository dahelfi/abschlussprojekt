import { Injectable, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/models/conversations.class';
import { User } from 'src/models/user.class';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService{
  allConversationsArrayForUse: any[] =[];
  allUsersArrayForUse: any[] = [];//hier rein werden die valueChanges aus der Collection Users aus Firebase geladen
  idFromConversationsArray!:string;
  idFromUsersArray!:string;
  uid!: string;
  loggedInUser!:User;//hier wird das aktuell eingeloggte userobjekt gespeichert
  allowInit: boolean = false;
  actualConversation!: Conversation;//hier wird das aktuell eingeloggte conversationobjekt gespeichert
  
 

  constructor(
    public database:AngularFirestore,
    public route: ActivatedRoute,
    ) { }
 
  public setTheLoggedInUser(user: User){
  
    this.loggedInUser = user;
    console.log("der eingeloggte user",this.loggedInUser)
  }

  public setTheLoggedInUserById(){
    if(!this.loggedInUser){
      
    }
    
  }


  // public getUidFromURL(){
  //   this.router.paramMap.subscribe((params)=>{
  //     this.loggedInUser = params.get('id');
  //   });
  // }

    public createInDatabase(category:string, objectToSave:any){   
     
      this.database
      .collection(category)
      .add(objectToSave)
      .then((result: any) => {
        console.log('Adding finished', result);
      });
    }


    public updateElementInDatabase(category:string, objectToUpdate:any, elementId:string){
    
      this.database
      .collection(category)
      .doc(elementId)
      .update(objectToUpdate)
      .then((result)=>{
        console.log("update finished");
      });
    }





      /*
    public getDataFormDatabase(category:string){
        let tempDoc: any[] = [];
        this.database.collection(category)
        .valueChanges({idField:"customIdName"})
        .subscribe((collection: any)=>{
            collection.forEach((element:any)=>{
           tempDoc.push(element);
           
           
            });
              this.elementArray = tempDoc;
              
        });
       
    }
    */
 
}
