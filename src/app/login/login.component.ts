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

  logIn() {
    /*setTimeout(async ()=>{
     
     

    },5000);
*/
  let testArray:string [] = this.backend.getDataFormDatabase('users');
  console.log("hier spricht das testarray", testArray);
    
  } 
    

    

    





  



  

}
