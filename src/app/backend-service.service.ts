import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Conversation } from 'src/models/conversations.class';
import { User } from 'src/models/user.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Message } from 'src/models/message.class';



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
  openThread?: boolean;
  actualConversationDescription!:any;
  actualThread!:Conversation;
  actualThreadMessage!: Message;
  actualThreadDescription!: any; 
  allowUpdateThreadDescription:boolean = false;
  testImage!:any;
  imageArrayMessage: any[] = [];
  imageArrayThread: any[] = [];
  
  
 

  constructor(
    public database:AngularFirestore,
    public route: ActivatedRoute,
    public storage: AngularFireStorage,
    public router: Router,
    ) { }
 

    /**
     * with this function we set and change the loggedinUser and transform the JSON into working objects
     * @param user 
     */
  public setTheLoggedInUser(user: User){
  
    this.loggedInUser = user;
    
  }


  /**
   * here we check if a channel is already subscribed, so we can avoid doubles
   * @param conversationId 
   * @returns 
   */
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

  public setTheActualThread(thread: Conversation){
    this.actualThread = thread;
  }

  public setTheActualThreadMessage(threadMessage: Message){
    this.actualThreadMessage = threadMessage;
  }


  /**
   * Add a conversation partner in the view as an new conversation is created
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

  /**
   * calculate the conversationid by give the first and the second participant
   * @param participant1 
   * @param participant2 
   * @returns 
   */

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

  /**
   * here we sort and filter all channels out of the central conversation array
   */

  public sortAllChannelsAndConversations(){
    this.allChannelsArrayForUse = [];

    for (let i = 0; i < this.allConversationsArrayForUse.length; i++) {
      if(this.allConversationsArrayForUse[i].channelName != ''){
          this.allChannelsArrayForUse.push(this.allConversationsArrayForUse[i]);
      }
    }
  }


  /**
   * in this function we calculate the actualconversationdescription
   */

  public calculateActualConversationDescription(){
  
    if(this.actualConversation && this.actualConversation.channelName != ''){
      this.actualConversationDescription = this.actualConversation.channelName;
    }else if(this.actualConversation){

      
      this.actualConversationDescription = this.findUserById(this.calculateActualConversationPartner(this.actualConversation)).userName;

    }else{
      this.actualConversationDescription = '';
    }
  }

  /**
   * in this function we calculate the description of the actual thread
   */

  public calculateActualThreadDescription(){
   
  if(this.allowUpdateThreadDescription){

    if(this.actualThread && this.actualThread.channelName != ''){
      this.actualThreadDescription = "#"+this.actualConversation.channelName;
    }else if(this.actualThread){

      //console.log("hier der errechnete ConversationsPartner: ",this.calculateActualConversationPartner);
      
      this.actualThreadDescription = this.findUserById(this.calculateActualConversationPartner(this.actualThread)).userName;
      //console.log("hier die ConversationDescription: ",this.actualConversationDescription);
    }else{
      this.actualThreadDescription = '';
    }

  }
 
  }

  /**
   * in this function we calculate the actual conversationpartner from the conversation
   */

  public calculateActualConversationPartner(element:any){
    let userIdTemp!:number;
   
      for (let i = 0; i < element.participators.length; i++) {
       if(element.participators[i] != this.loggedInUser.userId){
          userIdTemp = (element.participators[i]);
       }
        
      }


    
    return userIdTemp;
  }

  public findMessageObjektByIdInArray(messageId: number, messageArray: any[]){
    let messageElement!: any;
    for (let i = 0; i < messageArray.length; i++) {
      if(messageId == messageArray[i].messageId){
        messageElement = messageArray[i];
      }
      
    }

    return messageElement;

  }

  /**
   * in this function we calculate all subscribed channels from the loggedinUser
   */

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

  /**
   * here we update our message element in our actual thread
   * @param messageElement 
   */

  public updateMessageElementInActualThreadElement(messageElement :any){
    for (let i = 0; i < this.actualThread.messages.length; i++) {
    if(messageElement.messageId == this.actualThread.messages[i].messageId){
      this.actualThread.messages[i] = messageElement;
    }  
    
    }

  }

  /**
   * with this function we find any conversation in our central converstation array
   * @param conversationId 
   * @returns 
   */
  public findConversationById(conversationId:number){
    let conversationElement:any;
    for (let i = 0; i < this.allConversationsArrayForUse.length; i++) {
      if(this.allConversationsArrayForUse[i].conversationId == conversationId){
        conversationElement = this.allConversationsArrayForUse[i]
      }
      
    }
    return conversationElement;
  }

  /**
   * with this function we are able to find any user by name from our central user array
   * @param username 
   * @returns 
   */

  public findUserIdByName(username:any){
    let userId:any;
    for (let i = 0; i < this.allUsersArrayForUse.length; i++) {
      if(username == this.allUsersArrayForUse[i].userName){
        userId = this.allUsersArrayForUse[i].userId;
      }
      
    }
    
    return userId;
  }

  /**
   * with this function we are able to find any user by id
   * @param userId 
   * @returns 
   */
  public findUserById(userId:any){
    let userElement:any;
    for (let i = 0; i < this.allUsersArrayForUse.length; i++) {
     
      
    if(userId == this.allUsersArrayForUse[i].userId){
      userElement = this.allUsersArrayForUse[i];
    }  
    
    
    }
    return userElement;
  }


/**
 * with this function we are able to log out the user
 */
  public logout(){
    this.uid = '';
    this.loggedInUser = new User();
    this.router.navigate(['login'])
  }

  //=========================================== functions to process/manage the images ===================================>

  /**
    * with this function we search in our two arrays after the existing picture and return it
    * @param url 
    * @param category 
    * @returns 
    */
   public getImageById(url:string, category:string){
    let file:any;

    if(category == "thread"){
       for (let i = 0; i < this.imageArrayThread.length; i++) {
         if(url == this.imageArrayThread[i].url){
           file = this.imageArrayThread[i].image;

         } 
       }
    }else{
     for (let i = 0; i < this.imageArrayMessage.length; i++) {
       if(url == this.imageArrayMessage[i].url){
         file = this.imageArrayMessage[i].image;

       } 
     }
    }
    
    return file;
 }


   /**
    * with this function we filter and search in the actual all images 
    */

   public getAllImagesMessages(){

    this.imageArrayMessage = [];

    
    
    for (let i = 0; i < this.actualConversation.messages.length; i++) {
      if(this.actualConversation.messages[i].imageUrl !== ''){
        this.getFileByUrl(this.actualConversation.messages[i].imageUrl, "message");
      }
      
    }

   }


   /**
    * with this function we filter and search in the openthread all images 
    */

   public getAllImagesThread(){

   
    for (let i = 0; i < this.actualThread.messages.length; i++) {
      for(let j = 0; j <this.actualThread.messages[i].threadMessages.length; j++){
        if(this.actualThread.messages[i].threadMessages[j].imageUrl !== ''){
          this.getFileByUrl(this.actualThread.messages[i].threadMessages[j].imageUrl, "thread");

        }
      }
      
    }
   }

//================================= functions to process/manage the images =============================================>


   //==================================== functions to communicate directly with the database =============================>

   /**
    * 
    * @param category 
    * @param objectToSave 
    */
   public createInDatabase(category:string, objectToSave:any){   
     
    this.database
    .collection(category)
    .add(objectToSave)
    .then((result: any) => {
      console.log('Adding finished', result);
    });
  }


  /**
   * with this function we update existing documents in firebase
   * @param category 
   * @param objectToUpdate 
   * @param elementId 
   */
  public updateElementInDatabase(category:string, objectToUpdate:any, elementId:string){
  
    this.database
    .collection(category)
    .doc(elementId)
    .update(objectToUpdate)
    .then((result)=>{
      console.log("update finished");
    });
  }


   

     
  /**
   * with this function we get the imagefiles from firebase and store them in one of the two arrays
   * @param downloadUrl 
   * @param category 
   */
   public async getFileByUrl(downloadUrl:string, category: string){

    let image = await this.storage.ref(downloadUrl).getDownloadURL();



          let imageElement = {
            url: downloadUrl,
          image: image
        }

            if(category == "message"){
              this.imageArrayMessage.push(imageElement);
            }else if(category == "thread"){
              this.imageArrayThread.push(imageElement);
            }

   }

  /**
   * with this function we upload files (images) to our firebase storage and download them right away and store them in our array
   * @param filePath 
   * @param file 
   * @param category 
   */
  public uploadFilesToStorage(filePath:string, file:any, category: string){
    
    this.storage.upload(filePath, file).then(async()=>{
       let image =  this.storage.ref(filePath).getDownloadURL();
      
        let imageElement = {
           url: filePath,
         image: image
        }

        
        if(category == "thread"){
          this.imageArrayThread.push(imageElement);
        }else if(category == "message"){
          this.imageArrayMessage.push(imageElement);

        }
           
    })

  }

     //==================================== functions to communicate directly with the database =============================>
   
}




