import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavItemsService {
  private favItemsUrl = 'http://localhost:8000/api/favourite/favitems';
  private removeFavUrl = 'http://localhost:8000/api/favourite/remove';

  constructor(private http: HttpClient) {}

  getfavItems(): Observable<any> {
    return this.http.get(this.favItemsUrl, { withCredentials: true });
  }

  removeFromFav(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.removeFavUrl, { productId }, { headers, withCredentials: true });
  }
}