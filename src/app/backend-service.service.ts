import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { timeout } from 'rxjs';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  
  elementArray:string[] = [];
 

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
        this.database.collection(category).valueChanges().subscribe((collection: any)=>{
            collection.forEach((element:string)=>{
           tempDoc.push(element);
            });
              this.elementArray = tempDoc;
        });
       
    }

        


  
        
    



    public doSomething(){
      console.log("ich werde ausgefphrt");
      
    }
}
