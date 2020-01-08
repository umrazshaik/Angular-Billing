import { Component } from '@angular/core';
import { Users } from '../model/users';
import { LoginService } from '../Services/login.service';
import { CommonService } from '../shared/common.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { RetailerService } from '../Services/retailer.service';
import { Retailer } from '../model/Retailer';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';


@Component({
  templateUrl: './login.html',
})
export class LoginComponent {
  name = 'Angular';
  userState: any;
  loginuser: Users;
  
  constructor(private loginsvc: LoginService, private cmsvc: CommonService, private router: Router, private retailer: RetailerService,private toastr: ToastrService,private loader:SpinnerService) {
    this.loginuser = new Users();
  }

  ngOnInit() {
    if (this.cmsvc.getretailId() != 0) {
      this.router.navigateByUrl("/mainpage");
    }
  }

  validate(user: Users) {
    this.loader.show();
    this.loginsvc.login(user.UserName, user.Password).subscribe((data: any) => {
      if (data != null || undefined) {
        this.cmsvc.retailerId = data.RetailId;
        this.userState = data;
        localStorage.setItem('user', JSON.stringify(this.userState));
        this.getretailer();
        
      }
      else{
        this.toastr.error('login failed');
        this.loader.hide();
      }
    },er=>{
      this.toastr.error('login failed');
      this.loader.hide();
    });
  }

  getretailer() {
    this.retailer.getretailer().subscribe((data: any) => {
      if (data != null || undefined) {
        this.cmsvc.retaileR = data;
        localStorage.setItem('retail', JSON.stringify(data));
        this.loader.hide();
        this.router.navigateByUrl("/mainpage");
      }
    });
  }
}
