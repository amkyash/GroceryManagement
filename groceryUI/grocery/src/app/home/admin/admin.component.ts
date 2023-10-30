import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data:any;
  constructor(private getData:GetDataService, private route:Router){}
  ngOnInit(): void {
    this.retrieveData();
  }
  AdminAddProduct()
  {
    this.route.navigate([`/adminProduct`]);
  }
  
  retrieveData(){
    this.getData.GetProduct().subscribe((data: any)=>{
      this.data=data;
     });
  }
}
