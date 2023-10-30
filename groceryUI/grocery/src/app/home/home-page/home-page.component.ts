import { Component, OnInit } from '@angular/core';
import{ GetDataService} from 'src/app/services/get-data.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
    data:any;
    p:number=1;
    itemPerPage:number=4;
    totalProduct:any;

    constructor(private getData:GetDataService){}
    ngOnInit(): void {
    this.retriveData();
    }
    _name=this.getData._logName;
    
    retriveData(){
       this.getData.GetProduct().subscribe((data: any)=>{
       this.data=data;
       this.totalProduct=data.length;
      });
    }
}
