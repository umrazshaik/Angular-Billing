import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { CartsService } from '../Services/carts.service';
import { Carts } from '../model/carts';

declare var $: any;

@Component({
    templateUrl: './mainpage.html',
})
export class MainPageComponent {
    issidebar: boolean = false;
    public serachStr: string = '';
    tabselect: string = 'mainpage';
    cartsCount: number = 0;
    carts: Array<Carts>;
    name = 'Angular';
    public cdate = new Date();

    constructor(private router: Router, private commonsvc: CommonService, private castssvc: CartsService) {
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
        this.commonsvc.cartsCount.subscribe(p => this.cartsCount = p);
        let croutes = this.router.url.split('/');
        this.tabselect = (croutes.length == 2) ? croutes[1] : croutes[2];
        this.getCarts();
    }

    redirect() {
        this.router.navigate(['mainpage/products']);
    }

    getCarts() {
        let retailId = this.commonsvc.getretailId();
        this.castssvc.getCarts(retailId).subscribe((data: any) => {
            this.carts = data;
            this.commonsvc.modifyCartsCount(data.length);
            if (this.carts != null && this.carts.length > 3) {
                // take last 3 items in array
                this.carts = this.carts.reverse().slice(0,3);
            }
            console.log('castssvc', data);
        }, er => { /* error */ });
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
