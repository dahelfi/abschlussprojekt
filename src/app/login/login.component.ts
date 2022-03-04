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
  if(this.checkAllInputFields()){
    
      if(this.checkCredentials(this.backend.allUsersArrayForUse)){
        this.router.navigate(['user/' + this.backend.loggedInUser.customIdName]);
        
      
      }else{
        alert('Password or Username are incorrect try again');
      };
  
     
    }
  }

  public checkAllInputFields(){
    return this.inputPassword !=='' || this.inputPassword== undefined && this.inputUsername== undefined || this.inputUsername !=='';
  }
  


  /**
   * this method checks if one user has the same credentials which were typed in
   * @param testArray 
   * @returns 
   */
  checkCredentials(array:any[]){
    for (let i = 0; i < array.length; i++) {

      
      if(array[i].password === this.inputPassword &&
        array[i].userName === this.inputUsername){
          this.setTheLoggedInUser(array[i]);
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




