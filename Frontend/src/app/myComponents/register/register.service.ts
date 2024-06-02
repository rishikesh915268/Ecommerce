import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'http://localhost:8000/api/auth/register';

  constructor(private http:HttpClient){
  }

  register(user:any):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post(this.registerUrl, user, {headers});
  }
}