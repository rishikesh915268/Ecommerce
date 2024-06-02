import { Component, OnInit } from '@angular/core';
import {CartItemService} from './cart-item.service';
import { AuthService } from '../../myServices/authService/auth.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})


export class CartItemComponent implements OnInit {
  cartItems: any[] = [];
  isLoggedIn = false;

  constructor(private cartItemService: CartItemService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadCartItems();
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.checkLoginStatus();
  }

  loadCartItems(): void {
    this.cartItemService.getCartItems().subscribe(

      data => {
        if(data && data.data){
          // console.log(data);
          this.cartItems = data.data;
        }
        else{
          this.cartItems = [];
        }
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  removeFromCart(productId: string): void {
    this.cartItemService.removeFromCart(productId).subscribe(
      response => {
        alert('Product removed from cart successfully!');
        this.loadCartItems();
      },
      error => {
        console.error('Error removing product from cart', error);
        alert('Failed to remove product from cart.');
      }
    );
  }
}
