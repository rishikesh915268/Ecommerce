import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './myComponents/products/products.component';
import { LoginComponent } from './myComponents/login/login.component';
import { RegisterComponent } from './myComponents/register/register.component';
import { AddProductComponent } from './myComponents/add-product/add-product.component';
import { AddToCartComponent } from './myComponents/add-to-cart/add-to-cart.component';
import { CartItemComponent } from './myComponents/cart-item/cart-item.component';
import { ProductDetailsComponent } from './myComponents/product-details/product-details.component';
import { FavItemsComponent } from './myComponents/fav-items/fav-items.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    AddToCartComponent,
    CartItemComponent,
    ProductDetailsComponent,
    FavItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
