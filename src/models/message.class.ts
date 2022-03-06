export class Message {
    // $key?: string;
    creatorId?: string;
    messageContent?: string;
    timestamp?: Date;

    public toJson() {
        return {
            creatorId: this.creatorId,
            messageContent: this.messageContent,
            timestamp: this.timestamp
        }
    }


}