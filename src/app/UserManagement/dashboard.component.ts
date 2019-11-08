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
    debugger;
    this.router.navigate(['/products']);
  }

}
