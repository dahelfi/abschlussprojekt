import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputPassword!: string;
  inputEmail!: string;



  constructor(
    public backend: BackendServiceService, 
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {}

  /**
   * this method manages the login: get the data form the backend and let the user go the main-interface
   */
  logIn() {
    if (this.allInputAreFilled()) {

      this.backend.getDataFormDatabase('UsersLamTest');
      
      setTimeout(() => {
        if (this.checkCredentials(this.backend.allDocuments)) {
          this.router.navigate(['main-interface']);

        } else {
          alert('Password or email are incorrect try again');
        };
      }, 500);

    }
  }

/**
 * if all input of login-field are filled.
 * @returns true of false
 */
  private allInputAreFilled() {
    return this.inputPassword !== '' || this.inputPassword == undefined && this.inputEmail == undefined || this.inputEmail !== '';
  }


  /**
   * this method checks if one user has the same credentials which were typed in
   * @param collectionUsers 
   * @returns true or false
   */
  checkCredentials(collectionUsers: any[]) {
    for (let i = 0; i < collectionUsers.length; i++) {

      if (collectionUsers[i].password === this.inputPassword &&
        collectionUsers[i].email === this.inputEmail) {
        this.backend.setMe(collectionUsers[i]);
        return true;
      }

    }
    return false;
  }


}




