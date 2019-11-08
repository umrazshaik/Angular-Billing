import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  templateUrl: './mainpage.html',
})
export class MainPageComponent  {
  constructor(private router: Router){

  }
  name = 'Angular';

  redirect()
  {
    debugger;
    this.router.navigate(['mainpage/products']);
  }
}
