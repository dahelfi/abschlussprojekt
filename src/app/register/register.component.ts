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
    userName: '', //Bind  to InputField name="name"
    email: '', //Bind to InputField name="email"
    password: '', //Bind to InputField name="message"
    role:''
  };
  userObject!:User;
  role!:string;

  

  constructor(public backend: BackendServiceService, private router: Router) { }

  ngOnInit(): void {

  }


  public registerUser(){
    this.backend.getDataFormDatabase('users');
    setTimeout(()=>{
    if(this.userJson.userName !== '' && this.userJson.userName !== '' &&
    this.userJson.password !=='' && this.role !== undefined){
      console.log("ich werde ausgeführt");
  
        if(!this.checkAllUserNames(this.backend.elementArray)){
          this.userJson['role'] = this.role;
          this.userObject = new User(this.userJson);
          this.backend.saveToDatabase('users',this.userObject.toJSON());
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

  },500);

  
  

   
  }

  public checkAllUserNames(array:any[]){
    for (let i = 0; i < array.length; i++) {
      if(array[i].userName == this.userJson.userName){
        return true;
      }
    }
    return false;
  }
}
