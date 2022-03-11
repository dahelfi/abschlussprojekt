export class Message{
    creatorId!:number;
    creatorUserName!:string;
    messageContent!: string;
    timestamp!: number;

    constructor(obj?:any){
        this.creatorId = obj? obj.creatorId : 0;
        this.creatorUserName = obj? obj.creatorUserName : '';
        this.messageContent = obj? obj.messageContent : '';
        this.timestamp = obj? obj.timestamp : 0; 
        

    }

    public toJson(){
       return{
           creatorId: this.creatorId,
           creatorUserName: this.creatorUserName,
           messageContent: this.messageContent,
           timestamp : this.timestamp
       } 
    }




}