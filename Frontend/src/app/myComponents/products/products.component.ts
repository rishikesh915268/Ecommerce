import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { AuthService } from 'src/app/myServices/authService/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filterCategory: string = '';
  filterBrand: string = '';
  filterTitle: string = '';
  isLoggedIn:boolean = false;
  constructor(private productsService: ProductsService, private authService:AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getProducts();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.checkLoginStatus();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error getting products', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => 
      (this.filterCategory ? product.category.includes(this.filterCategory) : true) &&
      (this.filterBrand ? product.brand.includes(this.filterBrand) : true) &&
      (this.filterTitle ? product.title.includes(this.filterTitle) : true)
    );
  }

  deleteProduct(productId: string): void {
    if (!this.isLoggedIn) {
      alert('Please log in to delete products.');
      return;
    }

    this.productsService.deleteProduct(productId).subscribe(
      response => {
        alert('Product deleted successfully!');
        this.getProducts();
      },
      error => {
        console.error('Error deleting product', error);
        alert('Failed to delete product.');
      }
    );
  }


}
