import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

declare var $: any;

@Component({
    templateUrl: './mainpage.html',
})
export class MainPageComponent {
    issidebar: boolean = false;
    public serachStr: string = '';
    tabselect: string = 'mainpage';

    constructor(private router: Router, private commonsvc: CommonService) {
        router.events.subscribe(val => {
            this.serachStr = '';
        });
    }

    ngOnInit() {
        if (window.innerWidth > 400) {
            //desktop screen code

            this.commonsvc.sliderOpen();
        }
        else {
            //mobile screen code            
            this.commonsvc.sliderClose();
        }
        this.commonsvc.slider.subscribe(p => this.issidebar = p);
        let croutes = this.router.url.split('/');
        this.tabselect = (croutes.length == 2) ? croutes[1] : croutes[2];
    }

    name = 'Angular';

    redirect() {
        this.router.navigate(['mainpage/products']);
    }

    navLinkClick(stab: string) {
        this.tabselect = stab;
        if (window.screen.width < 400) {
            this.commonsvc.sliderClose();
        }
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
