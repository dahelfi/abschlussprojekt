import { Conversation } from "./conversations.class";

export class User {
    userName: string;
    email: string;
    password: string;
    role: string;




    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.role = obj ? obj.role : '';
    }



    public toJSON() {
        return {
            userName: this.userName,
            email: this.email,
            password: this.password,
            role: this.role,
        };
    }
}