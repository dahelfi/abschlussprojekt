import { Injectable } from "@angular/core";

@Injectable()

export class DataPassingService {
    public mycustomIdName: any ;

    setMyEmail(customIdName: any){
        this.mycustomIdName = customIdName;
    }
}