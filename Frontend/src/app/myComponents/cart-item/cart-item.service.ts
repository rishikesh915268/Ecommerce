import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private cartItemsUrl = 'http://localhost:8000/api/cart/cartitems';
  private removeFromCartUrl = 'http://localhost:8000/api/cart/remove';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get(this.cartItemsUrl, { withCredentials: true });
  }

  removeFromCart(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.removeFromCartUrl, { productId }, { headers, withCredentials: true });
  }
}