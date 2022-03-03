import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ThreadComponent } from './thread/thread.component';
import { MainInterfaceComponent } from './main-interface/main-interface.component';

const routes: Routes = [
{path:'', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'user/:id/main-interface', component:MainInterfaceComponent}, //TODO - user ID should be passed on localhref while going to page mainInterface
{path:'login/main-interface', component:MainInterfaceComponent},
{path:'main-interface', component:MainInterfaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
