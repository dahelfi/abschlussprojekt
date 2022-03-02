export class AllConversations{

    allConversationsArray: any[] = [];
    constructor(){}

    toJson(){
        return{
            allConversationsArray: this.allConversationsArray
        };
    }
}