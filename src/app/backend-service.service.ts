import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  user!: User;
  tempDoc2: string[] = [];

  constructor(public database:AngularFirestore) { }




    public saveToDatabase(category:string, objectToSave:any){   
      this.database
      .collection(category)
      .add(objectToSave)
      .then((result: any) => {
     
        console.log('Adding finished', result);
    
      });
    }


    public getDataFormDatabase(category:string){
        let tempDoc: string[] = [];
        this.database.collection(category).valueChanges().subscribe((users: any)=>{
          users.forEach(async (doc:string)=>{
            let users: string = doc;
            this.tempDoc2.push(users);
            tempDoc.push(users);
            //console.log(doc);
            
            

            
           
           
          });
          //console.log("tempDocInnenInnen: ",tempDoc[0]);
        });
        
        //console.log("tempDocInnenAussen: ",tempDoc[0]);

        //console.log("tempdocAussen: ",this.tempDoc2[0]);
        return this.tempDoc2;
        
        
    }

        


  
        
    



    public doSomething(){
      console.log("ich werde ausgefphrt");
      
    }
}
