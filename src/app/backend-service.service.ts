import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  
  elementArray:any[] = [];
  loggedInUser!:User;
  idFromAddedElement!: string;
 

  constructor(public database:AngularFirestore) { }

    public CreateInDatabase(category:string, objectToSave:any){   
     
      this.database
      .collection(category)
      .add(objectToSave)
      .then((result: any) => {
        console.log('Adding finished', result);
      });
  
    }


    public getDataFormDatabase(category:string){
        let tempDoc: any[] = [];
        this.database.collection(category).valueChanges({idField:"customIdName"}).subscribe((collection: any)=>{
            collection.forEach((element:any)=>{
           tempDoc.push(element);
           
           
            });
              this.elementArray = tempDoc;
              
        });
       
    }

    public updateElementInDatabase(category:string, objectToUpdate:any, elementId:string){
      
      this.database
      .collection(category)
      .doc(elementId)
      .update(objectToUpdate)
      .then((result)=>{
        console.log("update finished");
      });

    }

 
}
