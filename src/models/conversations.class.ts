import { BackendServiceService } from "src/app/backend-service.service";
import { Message } from "./message.class";

export class Conversation{
    
    conversationId:number;
    channelName:string = '';
    participators: any[]; //vllt doch besser UserObjekte nehmen, nachdenken noch nachher 
    messages: any[];
    customIdName:string = "";
    
    

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