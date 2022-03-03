export class Channel {
    name!: string;
    messages: any[]=[];
    members: any[]=[];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.messages = obj ? obj.messages : [];
        this.members = obj ? obj.members : [];
    }
    
    public toJSON() {
        return {
            name: this.name,
            messages: this.messages,
            members: this.members,
        }
    }
}