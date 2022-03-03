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
  Roles: any = ['I am an admin', 'I am an author', 'I am a reader'];
  userJson = {
    userName: '', //Bind  to InputField name="name"
    email: '', //Bind to InputField name="email"
    password: '', //Bind to InputField name="message"
    role: ''
  };
  userObject!: User;
  role!: string;




  constructor(public backend: BackendServiceService, private router: Router) { }

  ngOnInit(): void {

  }


  public registerUser() {
    this.backend.getDataFormDatabase('UsersLamTest');

    setTimeout(() => {
      if (this.allInputAreFilled()) {

        if (this.userNotExists(this.backend.allDocuments)) {

          this.userJson['role'] = this.role;
          this.userObject = new User(this.userJson);

          this.backend.CreateInDatabase('UsersLamTest', this.userObject.toJSON());
          this.insertUserIdIntoUserElement();
          this.router.navigate(['/login']);
        } else {
          alert('This email ist already taken. Please choose another one');
        }

      } else {
        alert('please register');
      }
      this.userJson.userName = '';
      this.userJson.email = '';
      this.userJson.password = '';
      this.role = '';

    }, 500);

  }

  allInputAreFilled() {
    return this.userJson.userName !== '' &&
      this.userJson.userName !== '' &&
      this.userJson.password !== '' &&
      this.role !== undefined ;
  }


  public insertUserIdIntoUserElement() {
    this.backend.getDataFormDatabase('users');
    setTimeout(() => {
      this.backend.idFromAddedElement = this.backend.allDocuments[this.backend.allDocuments.length - 1].customIdName;
      // this.userObject.customIdName = this.backend.idFromAddedElement;
      // this.backend.updateElementInDatabase('users', this.userObject.toJSON(),this.userObject.customIdName);

    }, 500);

  }

  public userNotExists(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].email != this.userJson.email) {
        return true;
      }
    }
    return false;
  }

}
