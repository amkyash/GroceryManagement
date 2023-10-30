import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  _productList:any;
  _price:any;
  _discount:any;
  _total:any;
  _isPresent:any;
  _placedButton:any;

  p:number=1;
  itemPerPage:number=3;
  totalProduct:any;

  constructor(private service:GetDataService,private route:Router){}
  ngOnInit(): void {
    this.orderDelievery();
  }

  total(){
    this._price=0;
     for(let item in this._productList)
    {
        this._price+=this._productList[item].productPrice;
    }

    this._discount=this._price*0.2;
    this._total=(this._price-this._discount)+200;
    if(this._price>0)
        this._placedButton=false;
  }

  placeOrder()
  {
    this.service.placeOrder().subscribe((val)=>{
      if(val)
      {
        this.route.navigate([`placed`])
      }
    });
  }
  removeItemFromCart(prodId:any){
    this.service.removeItemFromCart(prodId).subscribe((val:any)=>{
      console.log(val);
      alert("Product Removed From Cart");
      this.route.navigate([`home`]);
    });
  }

  orderDelievery()
  {
    this._placedButton=true;
    console.log("In cart construtor");
    this._isPresent=false;
    this.service.getFromCart().subscribe((val:any)=>{
      console.log(" getFromCart");
      console.log(val);
      this._productList=val;
      if(val.Count>0)
        this._isPresent=true;
    });
  }
}
