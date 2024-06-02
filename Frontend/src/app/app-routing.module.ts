import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './myComponents/products/products.component';
import { RegisterComponent } from './myComponents/register/register.component';
import { LoginComponent } from './myComponents/login/login.component';
import { AddProductComponent } from './myComponents/add-product/add-product.component';
import { AddToCartComponent } from './myComponents/add-to-cart/add-to-cart.component';
import { CartItemComponent } from './myComponents/cart-item/cart-item.component';

import { AuthguardGuard } from './myGuards/authguard.guard';
import { ProductDetailsComponent } from './myComponents/product-details/product-details.component';
import { FavItemsComponent } from './myComponents/fav-items/fav-items.component';

const routes: Routes = [
  {path: '', component: AddToCartComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products', component:ProductsComponent, canActivate: [AuthguardGuard]},
  {path: 'addproduct', component:AddProductComponent, canActivate: [AuthguardGuard]},
  {path: 'cartitems', component: CartItemComponent, canActivate:[AuthguardGuard]},
  { path: 'product/:id', component: ProductDetailsComponent},
  {path: 'favourite', component:FavItemsComponent, canActivate:[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
