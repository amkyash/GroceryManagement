import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-particular-product',
  templateUrl: './particular-product.component.html',
  styleUrls: ['./particular-product.component.css']
})
export class ParticularProductComponent {
  _data: GetDataService;
  _allReviews:any;
  _content: any;
  _productId: any;
  _incrimentValue: any;
  _disable: any;
  _countVal: any;
  _reviewList:any;
  _toggel:any;
  constructor(private data: GetDataService, private route: ActivatedRoute, private router: Router) {
    this._data = data;
    this._reviewList=[];
    this._productId = this.route.snapshot.paramMap.get('id');
    this._data.DetailOfProduct(this._productId).subscribe((data) => {
      if (data == null) {
        this._content = null;
      }
      else {
        this._content = data
      }
      
      this._countVal = this._content.productCount;
      
    });
    this._incrimentValue = 0;

  }
  ngOnInit(): void {
  }

  increase() {
    if (this._incrimentValue < this._content.productCount)
      this._incrimentValue = this._incrimentValue + 1;
  }
  decrease() {
    if (this._incrimentValue > 0)
      this._incrimentValue = this._incrimentValue - 1;
  }

  AddToCart(id: any) {
    if (this.data.checkLogin()) {
      this.data.addToCart(id).subscribe((val: any) => {
        if (val == "Ok") {
          alert("Product Added in Cart");
        }
      })
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }

 checkAdmin()
 {
  if(this.data._logEmail=="admin@official.com")
    return true;
  else
    return false;
 }

}


