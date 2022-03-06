import { Injectable, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { user } from 'rxfire/auth';
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
  conversationPartnerByName:string[] = [];  
  
 

  constructor(
    public database:AngularFirestore,
    public route: ActivatedRoute,
    ) { }
 
  public setTheLoggedInUser(user: User){
  
    this.loggedInUser = user;
    console.log("der eingeloggte user",this.loggedInUser)
  }


  public updateConversationPartnerArray(){
    
    let conversationElement:any;
    this.conversationPartnerByName = [];
    for (let i = 0; i < this.loggedInUser.allConversations.length; i++) {
      
      conversationElement = this.findConversationById(this.loggedInUser.allConversations[i]);
     
      
      if(conversationElement){
        for (let i = 0; i < conversationElement.participators.length; i++) {
          if(conversationElement.participators[i] != this.loggedInUser.userId){
            this.conversationPartnerByName.push(this.findUserById(conversationElement.participators[i]).userName);

          }
          
        } 
      }
    }
  } 


  public findConversationId(participant1:number, participant2:number){
    let tempId:any;
    for (let i = 0; i < this.allConversationsArrayForUse.length; i++) {
      const element = this.allConversationsArrayForUse[i].participators;
      if(element[0] == participant1 && element[1]== participant2
        || element[0] == participant2 && element[1] == participant1){
          tempId = this.allConversationsArrayForUse[i].customIdName;
        }
    }

    return tempId;
  }

  public findConversationById(conversationId:number){
    let conversationElement:any;
    for (let i = 0; i < this.allConversationsArrayForUse.length; i++) {
      if(this.allConversationsArrayForUse[i].conversationId == conversationId){
        conversationElement = this.allConversationsArrayForUse[i]
      }
      
    }
    return conversationElement;
  }

  public findUserIdByName(username:any){
    let userId:any;
    for (let i = 0; i < this.allUsersArrayForUse.length; i++) {
      if(username == this.allUsersArrayForUse[i].userName){
        userId = this.allUsersArrayForUse[i].userId;
      }
      
    }
    
    return userId;
  }

  public findUserById(userId:any){
    let userElement:any;
    for (let i = 0; i < this.allUsersArrayForUse.length; i++) {
     
      
    if(userId == this.allUsersArrayForUse[i].userId){
      userElement = this.allUsersArrayForUse[i];
    }  
    
    
    }
    return userElement;
  }

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
