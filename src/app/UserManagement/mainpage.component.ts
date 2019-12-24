import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Component({
  templateUrl: './mainpage.html',
})
export class MainPageComponent {
  constructor(private router: Router, private commonsvc: CommonService) {

  }
  name = 'Angular';

  redirect() {
    this.router.navigate(['mainpage/products']);
  }

  logOut() {    
    this.commonsvc.retailerId=0;
    this.commonsvc.clearlocalStorage();
    this.router.navigateByUrl('');
  }
}
