import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'INR'
})
export class InrPipe implements PipeTransform {

  transform(value: number): any {
    let x = value.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = '₹' + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

}
