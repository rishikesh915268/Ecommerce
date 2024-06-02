import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../myServices/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginService.login(this.user).subscribe(
      response => {
        console.log("User Logged in Successfully", response);
        this.authService.setLoginStatus(true);
        this.router.navigate(['/']);
      },
      error => {
        console.log("Error in logging in", error);
        alert(error.message);
      }
    )
  }
}

