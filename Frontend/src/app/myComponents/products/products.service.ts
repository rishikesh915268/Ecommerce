import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getProductsUrl = 'http://localhost:8000/api/product/getproducts';
  private deleteProductUrl = 'http://localhost:8000/api/product/deleteproduct';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.getProductsUrl);
  }

  deleteProduct(_id: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const payload = {_id: _id}
    return this.http.post(this.deleteProductUrl,payload, {headers, withCredentials:true})
  }
}
