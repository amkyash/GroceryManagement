import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
   providedIn: 'root'
})
export class GetDataService implements OnInit {

   url: string = 'https://localhost:4001/api/Shopping/';

   userPersonaldata: Array<any> = [];
   currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
   jwtHelperService = new JwtHelperService();
   //#################################################################
   _logName: any;
   _logEmail: any;
   _logId: any;
   //#################################################################

   constructor(private http: HttpClient) {
   }
   ngOnInit(): void {
      this.loadCurrentUser();
   }

   // API Connection for List of data
   public GetProduct(): any {
      return this.http.get(this.url + "GetList");
   }

   public DetailOfProduct(id: number) {
      return this.http.get(this.url + "ProductDetail?id=" + id);
   }

   public ProductWithCategory(category: string): any {
      return this.http.get(this.url + "productCategory?category=" + category);
   }
   public PoductWithName(name: string): any {
      return this.http.get(this.url + "ProductbyName?name=" + name);
   }

   public RegisterUser(user: Array<any>): any {
      return this.http.post(this.url + "CreateUser",
         {
            FirstName: user[0],
            LastName: user[1],
            Email: user[2],
            Mobile: user[3],
            Gender: user[4],
            Pwd: user[5]
         }
         , { responseType: 'text' });
   }
   public LoginUser(user: Array<any>): any {
      return this.http.post(this.url + "LoginU",
         {
            Email: user[0],
            Pwd: user[1]
         }, { responseType: 'text' })
   }
   setToken(token: string) {
      localStorage.setItem("access_token", token);
      this.loadCurrentUser();
   }
   loadCurrentUser() {
      const token = localStorage.getItem("access_token");
      const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
      const data = userInfo ? {
         id: userInfo.id,
         firstname: userInfo.firstname,
         lastname: userInfo.lastname,
         email: userInfo.email,
         mobile: userInfo.mobile,
         gender: userInfo.gender
      } : null;
      this.currentUser.next(data);

      this.currentUser.subscribe(val => {
         this._logId = val.id;
         this.userPersonaldata.push(val.id);
         this._logName = val.firstname;
         this.userPersonaldata.push(val.lastname);
         this._logEmail = val.email;
         this.userPersonaldata.push(val.mobile);
         this.userPersonaldata.push(val.gender);
      });

   }
   removeToken() {
      localStorage.clear();

   }
   editProduct(product: Array<any>) {
      return this.http.post(this.url + "editProduct", {
         id: product[0],
         productName: product[1],
         productDescription: product[2],
         productPrice: product[3],
         productImageLink: product[4],
         productCategory: product[5],
         productCount: product[6],
         productDiscount: product[7],
         productSpecification: product[8]
      }, { responseType: 'text' })
   }
   addProduct(product: Array<any>) {
      console.log(product[0], product[1], product[2], product[3], product[4], product[5], product[6], product[7]);
      return this.http.post(this.url + "addProduct",
         {
            productName: product[0],
            productDescription: product[1],
            productPrice: product[2],
            productImageLink: product[3],
            productCategory: product[4],
            productCount: product[5],
            productDiscount: product[6],
            productSpecification: product[7]

         }, { responseType: 'text' }
      );
   }

   //delete the product
   deleteProduct(idOfProduct: number) {
      return this.http.post(this.url + "deleteProduct", { id: idOfProduct }, { responseType: 'text' });
   }

   checkLogin() {
      const token = localStorage.getItem("access_token");
      if (token != null)
         return true;
      else return false;
   }
   checkAdmin() {
      console.log("Hi admin");
      localStorage.setItem("email",this._logEmail)
   }

   addToCart(productId: any) {
      console.log(this._logEmail)
      return this.http.post(this.url + "cartSet", { email: this._logEmail, prodId: productId }, { responseType: 'text' });
   }

   getFromCart() {
      console.log(this._logId);
      return this.http.get(this.url + "cartGet?uIdd=" + this._logId);
   }
   placeOrder() {
      return this.http.get(this.url + "placeOrder?id=" + this._logId);
   }
   myOrder() {
      return this.http.get(this.url + "myOrder?id=" + this._logId);
   }

   removeItemFromCart(prodId:any)
   {
      return this.http.post(this.url+"removeCartItem",{
         email:this._logEmail,
         productId:prodId
      },{responseType:'text'});
   }
}
