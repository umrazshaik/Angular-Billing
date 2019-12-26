import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Component({
  templateUrl: './mainpage.html',
})
export class MainPageComponent {

  public serachStr:string = '';
  constructor(private router: Router, private commonsvc: CommonService) {
    router.events.subscribe(val => {
      this.serachStr = '';
    });
  }
  name = 'Angular';

  redirect() {
    this.router.navigate(['mainpage/products']);
  }

  onChange(event: string) {    
    this.commonsvc.pushSearchStr(event);
  }

  logOut() {
    this.commonsvc.retailerId = 0;
    this.commonsvc.clearlocalStorage();
    this.router.navigateByUrl('');
  }

}
