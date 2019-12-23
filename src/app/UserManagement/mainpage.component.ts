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
     
    this.router.navigate(['mainpage/products']);
  }
}
