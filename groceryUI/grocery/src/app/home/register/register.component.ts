import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public _displayMsg: any;
  _repeatPass: string = 'none';
  constructor(private _service: GetDataService, private route: Router) { }

  ngOnInit(): void {
  }
  registerform = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z].*')]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z].*')]),
    email: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]),
    gender: new FormControl("", [Validators.required]),
    pwd: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$')]),
    rpw: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$')])
  });

  registerSubmitted(): any {
    console.log(this.registerform);
    if (this.registerform.value.rpw != "" && (this.registerform.value.rpw == this.registerform.value.pwd)) {
      this._service.RegisterUser([this.registerform.value.firstname,
      this.registerform.value.lastname,
      this.registerform.value.email,
      this.registerform.value.mobile,
      this.registerform.value.gender,
      this.registerform.value.pwd
      ]).subscribe((data: any) => {
        this._displayMsg = data;
        this._repeatPass='none';
      })
    }
    else{
      this._repeatPass='inline';
    }
  }

  get FirstName(): FormControl {
    return this.registerform.get("firstname") as FormControl
  }
  get LastName(): FormControl {
    return this.registerform.get("lastname") as FormControl
  }
  get Email(): FormControl {
    return this.registerform.get("email") as FormControl
  }
  get Gender(): FormControl {
    return this.registerform.get("gender") as FormControl
  }
  get Mobile(): FormControl {
    return this.registerform.get("mobile") as FormControl
  }
  get PWD(): FormControl {
    return this.registerform.get("pwd") as FormControl
  }



}
