import { Component } from '@angular/core';
import {Router } from '@angular/router';


@Component({
  templateUrl: './dashboard.html'
})
export class DashBoardComponent {

  constructor(private router: Router){

  }
  name = 'Angular';

  redirect()
  {
     ;
    this.router.navigate(['/products']);
  }

}
