import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
    document.cookie = `isLoggedIn=${status}; path=/`;
  }

  checkLoginStatus(): boolean {
    const cookies = document.cookie.split('; ');
    const loggedInCookie = cookies.find(x => x.startsWith('isLoggedIn='));
    return loggedInCookie ? loggedInCookie.split('=')[1] === 'true' : false;
  }
}
