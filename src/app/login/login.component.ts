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
  }

  /**
   * this method manages the login: get the data form the backend and let the user go the main-interface
   */
  logIn() {
  if(this.inputPassword !=='' || this.inputPassword== undefined && this.inputUsername== undefined || this.inputUsername !==''){
   
    this.backend.getDataFormDatabase('users');
    setTimeout(()=>{
      if(this.checkCredentials(this.backend.elementArray)){
        this.router.navigate(['login/main-interface']);
      
      }else{
        alert('Password or Username are incorrect try again');
      };
    },500);
     
    }
  }
  


  /**
   * this method checks if one user has the same credentials which were typed in
   * @param testArray 
   * @returns 
   */
  checkCredentials(testArray:any[]){
    for (let i = 0; i < testArray.length; i++) {
      console.log("hier wird testarray gelogged",testArray[i]);
      
      if(testArray[i].password === this.inputPassword &&
        testArray[i].userName === this.inputUsername){
          this.setTheLoggedInUserId(new User(testArray[i]));
          return true;
      }
    }
    return false;
  }


  /**
   * 
   * @param userId this method puts the 
   */
  setTheLoggedInUserId(user:User){
    console.log("das hier ist dann das gesetzte userobject", user);
    this.backend.loggedInUser = user;
   
    
  }
    
  


}




