import { Component } from '@angular/core';
import { AuthService } from './myServices/authService/auth.service';
import { LogoutServiceService } from './myServices/logoutService/logout-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLoggedIn = false;
  title = '';
  constructor(private authService:AuthService, private logoutService: LogoutServiceService, private router:Router){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkLoginStatus();
  }
  
  logout():void{
    this.logoutService.logout().subscribe(
      response=>{
        console.log("Logged out Successfully", response);
        this.authService.setLoginStatus(false);
        this.router.navigate(['/login']);
        alert('User Logged out');
      },
      error=>{
        console.log('Error in logout', error);
        alert(error.message);
      }
    )
  }
}
