export class Message{
    creatorId!:number;
    messageContent!: string;
    timestamp!: number;

    constructor(obj?:any){
        this.creatorId = obj? obj.creatorId : 0;
        this.messageContent = obj? obj.messageContent : '';
        this.timestamp = obj? obj.timestamp : 0; 
        

    }

    public toJson(){
       return{
           creatorId: this.creatorId,
           messageContent: this.messageContent,
           timestamp : this.timestamp
       } 
    }




}