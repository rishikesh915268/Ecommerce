// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class AddToCartService {
//   private productUrl = 'http://localhost:8000/api/product/getproducts';
//   private addToCartUrl = 'http://localhost:8000/api/cart/add';
//   private addToFavUrl = 'http://localhost:8000/api/favourite/add';
//   private removeFavUrl = 'http://localhost:8000/api/favourite/remove';

//   constructor(private http: HttpClient) {}

//   getProducts(): Observable<any> {
//     return this.http.get(this.productUrl);
//   }

//   addToCart(productId: string): Observable<any> {
//     const headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.addToCartUrl, { productId }, { headers, withCredentials: true });
//   }

//   addToFav(productId:string):Observable<any>{
//     const headers = new HttpHeaders({'Content-Type':'application/json'});
//     return this.http.post(this.addToFavUrl,{productId},{headers, withCredentials:true});
//   }
  
//   removeFromFav(productId: string): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post(this.removeFavUrl, { productId }, { headers, withCredentials: true });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  private productUrl = 'http://localhost:8000/api/product/getproducts';
  private addToCartUrl = 'http://localhost:8000/api/cart/add';
  private addToFavUrl = 'http://localhost:8000/api/favourite/add';
  private removeFavUrl = 'http://localhost:8000/api/favourite/remove';
  private getFavStatusUrl = 'http://localhost:8000/api/favourite/status';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.productUrl);
  }

  addToCart(productId: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.addToCartUrl, { productId }, { headers, withCredentials: true });
  }

  addToFav(productId: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.addToFavUrl, { productId }, { headers, withCredentials: true });
  }

  removeFromFav(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.removeFavUrl, { productId }, { headers, withCredentials: true });
  }

  getFavStatus(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.getFavStatusUrl, { productId }, { headers, withCredentials: true });
  }
}

