import { Conversation } from "./conversations.class";

export class User{
    userId:number;
    userName: string;
    email: string;
    password: string;
    role: string;
    allConversations: any[];
    customIdName:string;
    
  


 
    constructor(obj?: any){
        this.userId = obj? obj.userId : 0;
        this.userName = obj ? obj.userName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.role = obj ? obj.role : '';
        this.allConversations = obj? obj.allConversations : []; 
        this.customIdName = obj? obj.customIdName : '';
    }



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