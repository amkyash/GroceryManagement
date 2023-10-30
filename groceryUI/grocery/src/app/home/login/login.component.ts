import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/services/get-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _displayMsg:any;
  
  constructor(private _service:GetDataService, private route:Router){}
  ngOnInit(): void {
    
  }
  loginform=new FormGroup(
    {
      email:new FormControl("",[Validators.required,Validators.email]),
      pwd:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(20)])
    }
  );
  get Email():FormControl{
    return this.loginform.get("email") as FormControl
  }
  get PWD():FormControl{
    return this.loginform.get("pwd") as FormControl
  }
  LoginSubmitted()
  {
      this._service.LoginUser([this.loginform.value.email,
      this.loginform.value.pwd]).subscribe((data:any)=>{
        if(data=="Failure")
        {
          this._displayMsg=true;
          
        }
        else
        {
          this._service.setToken(data);
          this.route.navigate(['/home']);
        }
    });
  }
 
}
