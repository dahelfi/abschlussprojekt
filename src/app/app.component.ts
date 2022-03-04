import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private backend: BackendServiceService) { }

  ngOnInit(): void {

    this.backend.database.
      collection('conversations')
      .valueChanges({ idField: "customIdName" })
      .subscribe((conversations: any) => {
        this.backend.allConversationsArrayForUse = conversations;
        console.log("allConversationArrayForUse: ",this.backend.allConversationsArrayForUse);

      });
    this.backend.database.
      collection('users')
      .valueChanges({ idField: "customIdName" })
      .subscribe((users: any) => {
        this.backend.allUsersArrayForUse = users;
        console.log("allUserArrayForUse: ",this.backend.allUsersArrayForUse);
        
      });


  }
  title = 'abschlussprojekt';
}
