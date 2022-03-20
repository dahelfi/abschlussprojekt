import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainInterfaceComponent } from './main-interface/main-interface.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { ThreadComponent } from './thread/thread.component';
import { MatDividerModule } from '@angular/material/divider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TextFieldModule } from '@angular/cdk/text-field';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddMessageComponent } from './dialog-add-message/dialog-add-message.component';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { DialogSentImageComponent } from './dialog-sent-image/dialog-sent-image.component';
import { DialogThreadSentImageComponent } from './dialog-thread-sent-image/dialog-thread-sent-image.component';



@NgModule({
  declarations: [
    AppComponent,
    MainInterfaceComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    WorkspaceComponent,
    ThreadComponent,
    DialogAddMessageComponent,
    DialogAddChannelComponent,
    DialogSentImageComponent,
    DialogThreadSentImageComponent,
 
  ],
  imports: [
    TextFieldModule,
    CKEditorModule,
    MatDividerModule,
    MatTreeModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
