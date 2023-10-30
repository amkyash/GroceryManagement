import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit{

constructor(private service:GetDataService,private route:Router){}

ngOnInit(): void {
}


addform=new FormGroup({
  productname:new FormControl("",[Validators.required,Validators.maxLength(100),Validators.minLength(2)]),
  productdescription:new FormControl("",[Validators.required,Validators.maxLength(255)]),
  productcategory:new FormControl("",[Validators.required,Validators.maxLength(100)]),
  productcount:new FormControl("",[Validators.required,Validators.pattern('[0-9].*')]),
  productimagelink:new FormControl("",Validators.required),
  productprice:new FormControl("",[Validators.required,Validators.pattern('[0-9].*')]),
  productdiscount:new FormControl("",Validators.required),
  productspecification:new FormControl("",[Validators.maxLength(100)])
});

addSubmitted()
{
  this.service.addProduct(
    [this.addform.value.productname,
      this.addform.value.productdescription,
      this.addform.value.productprice,
      this.addform.value.productimagelink,
      this.addform.value.productcategory,
      this.addform.value.productcount,
      this.addform.value.productdiscount,
      this.addform.value.productspecification
      ]
  ).subscribe((val:any)=>{
  console.log(val);
  this.route.navigate([`/admin`]);
  }
    )
}

get ProductName():FormControl{
  return this.addform.get("productname") as FormControl
}
get ProductDescription():FormControl{
  return this.addform.get("productdescription") as FormControl
}
get ProductCategory():FormControl{
  return this.addform.get("productcategory") as FormControl
}
get ProductPrice():FormControl{
  return this.addform.get("productprice") as FormControl
}
get ProductCount():FormControl{
  return this.addform.get("productcount") as FormControl
}
get ProductSpecification():FormControl{
  return this.addform.get("productspecification") as FormControl
}
get ProductDiscount():FormControl{
  return this.addform.get("productdiscount") as FormControl
}
get ProductImageLink():FormControl{
  return this.addform.get("productimagelink") as FormControl
}
}