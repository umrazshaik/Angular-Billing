import { Component } from '@angular/core';
import { Users } from '../model/users';
import { LoginService } from '../Services/login.service';
import { CommonService } from '../shared/common.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { RetailerService } from '../Services/retailer.service';
import { Retailer } from '../model/Retailer';


@Component({
  templateUrl: './login.html',
})
export class LoginComponent {
  name = 'Angular';
  userState: any;
  loginuser: Users;
  
  constructor(private loginsvc: LoginService, private cmsvc: CommonService, private router: Router, private retailer: RetailerService) {
    this.loginuser = new Users();
  }

  ngOnInit() {

  }

  validate(user: Users) {
    this.loginsvc.login(user.UserName, user.Password).subscribe((data: any) => {
      if (data != null || undefined) {
        this.cmsvc.retailerId = data.RetailId;
        this.userState = data;
        localStorage.setItem('user', JSON.stringify(this.userState));
        this.getretailer();
      }
    });
  }

  getretailer() {
    this.retailer.getretailer().subscribe((data: any) => {
      if (data != null || undefined) {
        this.cmsvc.retaileR=data;
        localStorage.setItem('retail', JSON.stringify(data));
        this.router.navigateByUrl("/mainpage");
      }
    });
  }
}
