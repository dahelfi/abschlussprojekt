export class AllUsers{

    allUsersArray: any[] = [];
    constructor(){}

    toJson(){
        return{
            allUsersArray: this.allUsersArray
        };
    }
}