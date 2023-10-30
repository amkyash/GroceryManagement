import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public _productCategoryList:any;
  private _categoryId:any;
constructor(private _route:ActivatedRoute,private _service:GetDataService )
{
  this._categoryId=this._route.snapshot.paramMap.get('ida');
  this._service.ProductWithCategory(this._categoryId).subscribe((data:any)=>{
    this._productCategoryList=data;
  });
}
}
