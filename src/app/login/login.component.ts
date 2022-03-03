import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputPassword!:string;
  inputUsername!:string;
 


  constructor(public backend:BackendServiceService, private router: Router) { }

  ngOnInit(): void {
    this.backend.init();
  
    
      this.backend.database.
      collection('conversations')
      .valueChanges({idField:"customIdName"})
      .subscribe((conversations:any)=>{
      this.backend.allConversationsArrayForUse=conversations;//damit füllen wir unsere zentrale datenstruktur
      console.log("here are the stored conversations", conversations);
      });
      
      this.backend.database.
      collection('users')
      .valueChanges({idField:"customIdName"})
      .subscribe((users:any)=>{
        this.backend.allUsersArrayForUse=users;//damit füllen wir unsere zentrale datenstruktur users
        console.log("here are the stored users: ",users);

      });

  }

  /**
   * this method manages the login: get the data form the backend and let the user go the main-interface
   */
  logIn() {
  if(this.inputPassword !=='' || this.inputPassword== undefined && this.inputUsername== undefined || this.inputUsername !==''){
      console.log("hier vom backend",this.backend.allUsersArrayForUse);
      
   
      if(this.checkCredentials(this.backend.allUsersArrayForUse[0].allUsersArray)){
        this.router.navigate(['login/main-interface']);
      
      }else{
        alert('Password or Username are incorrect try again');
      };
  
     
    }
  }
  


  /**
   * this method checks if one user has the same credentials which were typed in
   * @param testArray 
   * @returns 
   */
  checkCredentials(testArray:any[]){
    for (let i = 0; i < testArray.length; i++) {

      
      if(testArray[i].password === this.inputPassword &&
        testArray[i].userName === this.inputUsername){
          this.setTheLoggedInUser(new User(testArray[i]));
          return true;
      }
    }
    return false;
  }


  /**
   * 
   * @param userId this method puts the given userobjekt and sets it as the loggedInUser
   */
  setTheLoggedInUser(user:User){
  
    this.backend.loggedInUser = user;
   
    
  }
    
  


}




