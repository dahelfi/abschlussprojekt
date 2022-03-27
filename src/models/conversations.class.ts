import { BackendServiceService } from "src/app/backend-service.service";
import { Message } from "./message.class";

export class Conversation{
    
    conversationId:number;// here we provide the id that we use in this programm we dont use the firebase id
    channelName:string = '';//if we have an channelConversation then we give a channelName to the Conversation
    participators: any[]; //here we store all userids from all user that participate on the conversation (min 2)
    messages: any[];// here we stroe all MessageObjekts that has been sended in the conversation
    customIdName:string = "";//here we store the firebase intern id that firebase gives every conversationDocument
    
    

    constructor(obj?:any){
        this.conversationId = obj? obj.conversationId : 0;
        this.participators = obj? obj.participators : [];
        this.messages = obj? obj.messages : [];
        this.customIdName = obj? obj.customIdName : '';
        this.channelName = obj? obj.channelName : '';

    }

    toObject(obj?:any){
        this.conversationId = obj.id;
        this.participators = obj.participators;
        this.messages = obj.messages;

    }

    toJson(){
        return{
            conversationId: this.conversationId,
            participators: this.participators,
            messages: this.messages,
            customIdName: this.customIdName,
            channelName: this.channelName,
        };
    }


   
    
    

    

    





}