import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user= {
    name:'',
    surname:'',
    email:'',
    password:'',
  };

  constructor(
    private userService:UserService,
    private _router: Router
  ){}

  registrationUser(){
    console.log(22);
    this.userService.registrationUser(this.user)
      .subscribe(resp => {
        console.log(resp);
      });
    this._router.navigate(['/login'])
  }
}
