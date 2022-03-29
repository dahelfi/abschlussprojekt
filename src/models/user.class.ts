import { Conversation } from "./conversations.class";

export class User{
    userId:number;//every user gets an intern id from us that we use in the programm we dont use the firebase id
    userName: string;
    email: string;
    password: string;
    role: string;
    allConversations: any[]; //here we store every conversation that the user is taking part
    customIdName:string;//hew we store the id that firebase provides to the stored documents
    
  


 
    constructor(obj?: any){
        this.userId = obj? obj.userId : 0;
        this.userName = obj ? obj.userName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.role = obj ? obj.role : '';
        this.allConversations = obj? obj.allConversations : []; 
        this.customIdName = obj? obj.customIdName : '';
    }



    /**
     * function to translate the existing objects into the JSON 
     * @returns 
     */
    public toJSON(){
        return {
            userId: this.userId,
            userName: this.userName,
            email : this.email,
            password: this.password,
            role: this.role,
            allConversations: this.allConversations,
            customIdName: this.customIdName,
        };

    }
}