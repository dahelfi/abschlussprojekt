import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  userJson = {
    customIdName: '',
    userName: '', //Bind  to InputField username
    email: '', //Bind to InputField email
    password: '', //Bind to InputField password
    role:'',
    userId: 0,
    allConversations: []
  };
  userObject!:User;
  role!:string;
  
  


  

  constructor(public backend: BackendServiceService, private router: Router) { }

  ngOnInit(): void {

  }


  /**
   * central function to manage the registration from a user
   */

  public registerUser(){
    
    if(this.checkIfallInputAreFilled()){
  
        if(!this.checkAllUserNames(this.backend.allUsersArrayForUse)){
          this.userJson.userId = this.backend.allUsersArrayForUse.length + 1;
          this.userJson['role'] = this.role;
          this.userObject = new User(this.userJson);
          this.backend.createInDatabase('users', this.userObject.toJSON());
         
          this.router.navigate(['/login']);
        }else{
          alert('Username ist already taken please choose another one');
      } 
     
    }else{
      alert('please register');
    }
    this.userJson.userName = '';
    this.userJson.email = '';
    this.userJson.password = '';
    this.role = '';

  }

  public checkIfallInputAreFilled(){
    return this.userJson.userName !== '' && this.userJson.userName !== '' &&
  this.userJson.password !=='' && this.role !== undefined}

/**
 * checks all matches if the given username is already set in the array
 * @param array 
 * @returns 
 */
  public checkAllUserNames(array:any[]){
    for (let i = 0; i < array.length; i++) {
      if(array[i].userName == this.userJson.userName){
        return true;
      }
    }
    return false;
  }
}
