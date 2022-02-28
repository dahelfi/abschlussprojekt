import { BackendServiceService } from "src/app/backend-service.service";
import { Message } from "./message.class";

export class Conversation{
    customIdName:string='';
    participators: string[] = []; //vllt doch besser UserObjekte nehmen, nachdenken noch nachher 
    messages: any[] = [];
    

    constructor(){}

    toJson(){
        return{
            customIdName: this.customIdName,
            participators: this.participators,
            messages: this.messages
        };
    }


   
    
    

    

    





}