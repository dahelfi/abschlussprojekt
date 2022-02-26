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
    this.userJson['role'] = this.role;
    this.userObject = new User(this.userJson);
    this.backend.saveToDatabase('users',this.userObject.toJSON());
    this.router.navigate(['/login']);

    this.userJson['userName'] = '';
    this.userJson['email'] = '';
    this.userJson['password'] = '';
    this.role = ''; 
  }



}
