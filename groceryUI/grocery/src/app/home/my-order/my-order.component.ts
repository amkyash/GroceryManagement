import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
    _productList:any;
    p:number=1;
    itemPerPage:number=3;
    totalProduct:any;
    constructor(private service:GetDataService){
    }
  ngOnInit(): void {
    this.retrieveProductList();
  }

    retrieveProductList(){
      this.service.myOrder().subscribe((val:any)=>{
          this._productList=val;
        });
    }


}
