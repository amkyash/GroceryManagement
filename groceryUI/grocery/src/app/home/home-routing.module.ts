import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlacedComponent } from './placed/placed.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { NoStockComponent } from './no-stock/no-stock.component';
import { ParticularProductComponent } from './particular-product/particular-product.component';


const routes: Routes = [
  {path:'details/:id',component:ParticularProductComponent},
  {path:'home',component:HomePageComponent},
  {path:'category/:ida',component:CategoryComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'adminProduct',component:AdminAddProductComponent},
  {path:'cart',component:CartComponent},
  {path:'placed',component:PlacedComponent},
  {path:'myorder',component:MyOrderComponent},
  {path:'nostock',component:NoStockComponent},
  {path:'**',component:PageNotFoundComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
