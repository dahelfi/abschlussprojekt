import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/models/conversations.class';
import { User } from 'src/models/user.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService{
  allConversationsArrayForUse: any[] =[];
  allChannelsArrayForUse:any[] = [];
  allUsersArrayForUse: any[] = [];//hier rein werden die valueChanges aus der Collection Users aus Firebase geladen
  idFromConversationsArray!:string;
  idFromUsersArray!:string;
  uid!: string;
  loggedInUser!:User;//hier wird das aktuell eingeloggte userobjekt gespeichert
  allowInit: boolean = false;
  actualConversation!: Conversation;//hier wird das aktuell eingeloggte conversationobjekt gespeichert
  conversationPartnerByName:string[] = [];
  allSubscribedChannels:any[] = [];  
  url:string = './assets/img/pexels-photo-1181290.jpg';
  image!:any;
  
 

  constructor(
    public database:AngularFirestore,
    public route: ActivatedRoute,
    public storage: AngularFireStorage
    ) { }
 
  public setTheLoggedInUser(user: User){
  
    this.loggedInUser = user;
    
  }

  public checkIfChannelAlreadySubscribed(conversationId:number){
    let flag = false;
    for (let i = 0; i < this.loggedInUser.allConversations.length; i++) {
     if(this.loggedInUser.allConversations[i] == conversationId){
       flag = true;
     }
      
    }

    return flag;

  }

  public setTheActualConversation(conversation: Conversation){
    this.actualConversation = conversation;
  }


  /**
   * methode unbedingt nochmal schöner schreiben
   */

  public updateConversationPartnerArray(){
   
    let conversationElement:any;
    this.conversationPartnerByName = [];
    for (let i = 0; i < this.loggedInUser.allConversations.length; i++) {
      
      conversationElement = this.findConversationById(this.loggedInUser.allConversations[i]);
     
      
      if(conversationElement && conversationElement.channelName == ''){
        let counter:number = 0;
        for (let i = 0; i < conversationElement.participators.length; i++) {
          
          if(conversationElement.participators[i] != this.loggedInUser.userId){
            this.conversationPartnerByName.push(this.findUserById(conversationElement.participators[i]).userName);

          }else if(conversationElement.participators[i] == this.loggedInUser.userId){
            counter++;
            if(counter==2){
              this.conversationPartnerByName.push(this.loggedInUser.userName);
            }

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

  public sortAllChannelsAndConversations(){
    this.allChannelsArrayForUse = [];

    for (let i = 0; i < this.allConversationsArrayForUse.length; i++) {
      if(this.allConversationsArrayForUse[i].channelName != ''){
          this.allChannelsArrayForUse.push(this.allConversationsArrayForUse[i]);
      }
    }
  }



  public showAllSubsribedChannels(){
    this.allSubscribedChannels = [];
    for (let i = 0; i < this.allChannelsArrayForUse.length; i++) {
    
      for (let j = 0; j < this.allChannelsArrayForUse[i].participators.length; j++) {
      if(this.loggedInUser.userId == this.allChannelsArrayForUse[i].participators[j]){
        this.allSubscribedChannels.push(this.allChannelsArrayForUse[i]);
      }  
      
      }
    
    }

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

    public uploadFilesToStorage(filePath:string, file:any){
      this.storage.upload(filePath, file);
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
