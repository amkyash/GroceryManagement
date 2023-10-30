import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private route: Router, private service: GetDataService) {
  }
  SearchFunction(val: any): any {
    this.route.navigate([`search/${val}`]);
  }

  UserRegisterFunction() {
    this.route.navigate([`register`]);
  }
  UserLoginFunction() {
    this.route.navigate([`login`]);
  }

  UserLogoutFunction() {
    this.service.removeToken();
    this.route.navigate([`home`]);
  }

  //to return true if user is login
  CheckLogin() {
    return this.service.checkLogin();
  }
  CheckAdmin()
  {
    this.service.checkAdmin();
    if(this.service._logEmail=="admin@official.com")
      return true;
    else
      return false;
  }

}
