import { Conversation } from "./conversations.class";

export class User{
    customIdName:string;
    userName: string;
    email: string;
    password: string;
    role: string;
    allConversations: string[] = [];
  


 
    constructor(obj?: any){
        this.customIdName = obj ? obj.customIdName : "";
        this.userName = obj ? obj.userName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.role = obj ? obj.role : '';
        
        
    }



    public toJSON(){
        return {
            customIdName: this.customIdName,
            userName: this.userName,
            email : this.email,
            password: this.password,
            role: this.role,
            allConversations: this.allConversations
        };

    }
}