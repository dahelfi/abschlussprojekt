import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
  }

  logIn(){
    console.log('log in');
  }

  



  

}
