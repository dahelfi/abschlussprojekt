export class Message{
    creatorId!:number;
    messageId!: number;
    creatorUserName!:string;
    messageContent!: string;
    timestamp!: number;
    imageUrl!:string;
    threadMessages: any[];

    constructor(obj?:any){
        this.creatorId = obj? obj.creatorId : 0;
        this.messageId = obj? obj.messageId : 0;
        this.creatorUserName = obj? obj.creatorUserName : '';
        this.messageContent = obj? obj.messageContent : '';
        this.timestamp = obj? obj.timestamp : 0;
        this.threadMessages = obj? obj.threadMessages : [];
        this.imageUrl = obj? obj.imageUrl : ''; 
        

    }

    public toJson(){
       return{
           creatorId: this.creatorId,
           messageId: this.messageId,
           creatorUserName: this.creatorUserName,
           messageContent: this.messageContent,
           timestamp: this.timestamp,
           threadMessages: this.threadMessages, 
           imageUrl: this.imageUrl,
       } 
    }




}