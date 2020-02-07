import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private _router: Router
  ) {
  }

  isLoginClicked = false;
  userData;
  isLogged = !!localStorage.getItem('token');
  loggedUser;

  ngOnInit(): void {
  }



  sendLoginDataUser(name, email, password) {
    this.userData = {
      name,
      email,
      password
    };
    this.userService.login(this.userData).subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
      this._router.navigate(['/main'])
      }
    );
  }
}

