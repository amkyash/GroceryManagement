import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import{ ReactiveFormsModule,FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlacedComponent } from './placed/placed.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ParticularProductComponent } from './particular-product/particular-product.component';
import { NoStockComponent } from './no-stock/no-stock.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    NavBarComponent,
    HomePageComponent,
    CategoryComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    AdminAddProductComponent,
    CartComponent,
    PageNotFoundComponent,
    PlacedComponent,
    MyOrderComponent,
    ParticularProductComponent,
    NoStockComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports:[NavBarComponent]
})
export class HomeModule { }
