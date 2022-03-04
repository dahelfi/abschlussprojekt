import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ThreadComponent } from './thread/thread.component';
import { MainInterfaceComponent } from './main-interface/main-interface.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
{path:'', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'user/:uid', component:MainInterfaceComponent}, //user ID should be passed on localhref while going to page mainInterface
{path:'user/:uid' + '/channel/:id', component:MainInterfaceComponent}, //channel ID should be passed on localhref while going to page workspace
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
