import { Injectable, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AllConversations } from 'src/models/allConversations.class';
import { AllUsers } from 'src/models/allUsers.class';
import { Conversation } from 'src/models/conversations.class';
import { User } from 'src/models/user.class';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService{
  allUsersArrayForUse: any[] = [];//hier rein werden die valueChanges aus der Collection Users aus Firebase geladen
  allConversationsArrayForUse: any[] = [];//hier rein werden die valueChanges aus der Collection Conversation aus Firebase geladen
  idFromConversationsArray!:string;
  idFromUsersArray!:string;
  loggedInUser!:User;//hier wird das aktuell eingeloggte userobjekt gespeichert
  allConversationsForDb:AllConversations = new AllConversations;//hier werden die conversationdaten gespeichert die zur datenbank gehen
  allUsersForDb: AllUsers = new AllUsers();//hier werden die userdaten gespeichert die zur datenbank gehen
  allowInit: boolean = false;
  actualConversation!: Conversation;//hier wird das aktuell eingeloggte conversationobjekt gespeichert
  
 

  constructor(public database:AngularFirestore) { }
 
  

    public CreateInDatabase(category:string, objectToSave:any){   
     
      this.database
      .collection(category)
      .add(objectToSave)
      .then((result: any) => {
        console.log('Adding finished', result);
      });
    }

    public updateAllConversations(){
      this.updateElementInDatabase("conversations", this.allConversationsForDb.toJson(),'c3L96vi9xSf9P0uDzAX9');//elementId ist hier erstmal hardgecodet soll aber dynamisch sein
    }

    public updateAllUsers(){
      this.updateElementInDatabase("users", this.allUsersForDb.toJson(),'DFPMpVEKfGWJwTByMf0W');//elementId ist hier erstmal hardgecodet soll aber dynamisch sein

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

    public init(){
   
      if(this.allowInit){//flag ist dazu da, das die beiden zentralen datenstrukturen nur einmal ganz am anfang gebildet werden und nachher nicht mehr
        this.CreateInDatabase("users",this.allUsersForDb.toJson());
        this.CreateInDatabase("conversations",this.allConversationsForDb.toJson());

      }
     
     
      
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
