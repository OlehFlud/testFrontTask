import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component'
import {RegisterComponent} from './component/register/register.component'
import {MainComponent} from "./component/main/main.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'app', component:AppComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'main', component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
