import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  user!: User;

  constructor(public database:AngularFirestore) { }




    public saveToDatabase(category:string, objectToSave:any){   
      this.database
      .collection(category)
      .add(objectToSave)
      .then((result: any) => {
     
        console.log('Adding finished', result);
    
      });
    }


    async getDataFormDatabase(category:string){
        let tempDoc:any = [];
        await this.database.firestore().collection(category).
        get().then((querySnapshot:any) => {
            
            querySnapshot.forEach((doc:any) => {
               tempDoc.push(doc);
            })
            console.log(tempDoc)
         });

         return tempDoc;
    }

    


    public doSomething(){
      console.log("ich werde ausgefphrt");
      
    }
}
