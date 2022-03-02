import { BackendServiceService } from "src/app/backend-service.service";
import { Message } from "./message.class";

export class Conversation{
    static conversationsIdCounter = 0;
    conversationId:number;
    participators: number[]; //vllt doch besser UserObjekte nehmen, nachdenken noch nachher 
    messages: any[];
    

    constructor(obj?:any){
        this.conversationId = obj? obj.conversationId : ++Conversation.conversationsIdCounter;
        this.participators = obj? obj.participators : [];
        this.messages = obj? obj.messages : [];

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
            messages: this.messages
        };
    }


   
    
    

    

    





}