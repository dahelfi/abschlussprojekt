import { Conversation } from "./conversations.class";

export class User{
    userId:number;
    userName: string;
    email: string;
    password: string;
    role: string;
    allConversations: number[] = [];
    static userIdCreator:number = 0
  


 
    constructor(obj?: any){
        this.userId = ++User.userIdCreator;
        this.userName = obj ? obj.userName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.role = obj ? obj.role : '';
        
        
    }



    public toJSON(){
        return {
            userId: this.userId,
            userName: this.userName,
            email : this.email,
            password: this.password,
            role: this.role,
            allConversations: this.allConversations
        };

    }
}