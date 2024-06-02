import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutServiceService {
  logoutUrl = "http://localhost:8000/api/auth/logout";
  constructor(private http:HttpClient) { }

  logout():Observable<any>{
    return this.http.post(this.logoutUrl,{}, {withCredentials: true});
  }
}
