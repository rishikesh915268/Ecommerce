import { Component, OnInit } from '@angular/core';
import {FavItemsService} from './fav-items.service';
import { AuthService } from '../../myServices/authService/auth.service';

@Component({
  selector: 'app-fav-items',
  templateUrl: './fav-items.component.html',
  styleUrls: ['./fav-items.component.css']
})


export class FavItemsComponent implements OnInit {
  favItems: any[] = [];
  isLoggedIn = false;

  constructor(private favItemsService: FavItemsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadFavItems();
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.checkLoginStatus();
  }

  loadFavItems(): void {
    this.favItemsService.getfavItems().subscribe(

      data => {
        if(data && data.data){
          // console.log(data);
          this.favItems = data.data;
        }
        else{
          this.favItems = [];
        }
      },
      error => {
        console.error('Error fetching favourite items', error);
      }
    );
  }

  removeFromFav(productId: string): void {
    this.favItemsService.removeFromFav(productId).subscribe(
      response => {
        alert('Product unmarked as favourite');
        this.loadFavItems();
      },
      error => {
        console.error('Error removing product from favourite', error);
        alert('Failed to remove product from favourite list');
      }
    );
  }
}