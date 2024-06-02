import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private loginUrl = 'http://localhost:8000/api/auth/login';

  constructor(private http:HttpClient){};

  login(user:any):Observable<any>{
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(this.loginUrl, user, {headers, withCredentials: true});
  }
}
