import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

declare var $: any;

@Component({
    templateUrl: './mainpage.html',
})
export class MainPageComponent {
    issidebar:boolean=false;
    public serachStr: string = '';
    constructor(private router: Router, private commonsvc: CommonService) {
        router.events.subscribe(val => {
            this.serachStr = '';
        });
    }

    ngOnInit() {
        //$('#sidebarToggleTop').on('click', function (event) {
        //    debugger
        //    var sidebar = $(event.relatedTarget)
        //});
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
