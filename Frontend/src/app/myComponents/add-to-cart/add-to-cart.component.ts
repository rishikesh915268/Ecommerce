// import { Component, OnInit } from '@angular/core';
// import { AddToCartService } from './add-to-cart.service';
// import { AuthService } from '../../myServices/authService/auth.service';

// @Component({
//   selector: 'app-add-to-cart',
//   templateUrl: './add-to-cart.component.html',
//   styleUrls: ['./add-to-cart.component.css']
// })
// export class AddToCartComponent implements OnInit {
//   products: any[] = [];
//   isLoggedIn = false;
//   isFav:boolean = false;
//   constructor(
//     private addToCartService: AddToCartService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.isLoggedIn = this.authService.checkLoginStatus();
//     this.addToCartService.getProducts().subscribe(data => {
//       this.products = data;
//     });
//   }

//   addToCart(productId: string): void {
//     if (!this.isLoggedIn) {
//       alert('Please log in to add products to the cart.');
//       return;
//     }

//     this.addToCartService.addToCart(productId).subscribe(
//       response => {
//         alert('Product added to cart successfully!');
//       },
//       error => {
//         console.error('Error adding product to cart', error);
//         alert('Failed to add product to cart.');
//       }
//     );
//   }

//   addToFav(productId: string): void {
//     if (!this.isLoggedIn) {
//       alert('Please log in to mark product as favourite.');
//       return;
//     }

//     this.addToCartService.addToFav(productId).subscribe(
//       response => {
//         this.isFav = true;
//         alert('Product marked as favourite');
//       },
//       error => {
//         console.error('Error adding product to favourite list', error);
//         alert('Failed to add product to favourite list');
//       }
//     );
//   }

//   removeFromFav(productId: string): void {
//     if (!this.isLoggedIn) {
//       alert('Please log in to unmark product as favourite.');
//       return;
//     }

//     this.addToCartService.removeFromFav(productId).subscribe(
//       response => {
//         this.isFav = false;
//         alert('Product removed from favourite');
//       },
//       error => {
//         console.error('Error removing product from favourite', error);
//         alert('Failed to remove product from favourite list');
//       }
//     );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AddToCartService } from './add-to-cart.service';
import { AuthService } from '../../myServices/authService/auth.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  products: any[] = [];
  isLoggedIn = false;

  constructor(
    private addToCartService: AddToCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkLoginStatus();
    this.addToCartService.getProducts().subscribe(data => {
      this.products = data;
      this.updateFavStatus();
    });
  }

  updateFavStatus(): void {
    if (!this.isLoggedIn) {
      return;
    }
    this.products.forEach(product => {
      this.addToCartService.getFavStatus(product._id).subscribe(
        response => {
          product.isFav = response.isFav;
        },
        error => {
          console.error('Error fetching favorite status', error);
        }
      );
    });
  }

  addToCart(productId: string): void {
    if (!this.isLoggedIn) {
      alert('Please log in to add products to the cart.');
      return;
    }

    this.addToCartService.addToCart(productId).subscribe(
      response => {
        alert('Product added to cart successfully!');
      },
      error => {
        console.error('Error adding product to cart', error);
        alert('Failed to add product to cart.');
      }
    );
  }

  toggleFav(product: any): void {
    if (!this.isLoggedIn) {
      alert('Please log in to mark product as favourite.');
      return;
    }

    if (product.isFav) {
      this.addToCartService.removeFromFav(product._id).subscribe(
        response => {
          product.isFav = false;
          alert('Product removed from favourite');
        },
        error => {
          console.error('Error removing product from favourite', error);
          alert('Failed to remove product from favourite list');
        }
      );
    } else {
      this.addToCartService.addToFav(product._id).subscribe(
        response => {
          product.isFav = true;
          alert('Product marked as favourite');
        },
        error => {
          console.error('Error adding product to favourite list', error);
          alert('Failed to add product to favourite list');
        }
      );
    }
  }
}
