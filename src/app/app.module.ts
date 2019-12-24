import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './UserManagement/mainpage.component';
import { HelloComponent } from './hello.component';
import { DashBoardComponent } from './UserManagement/dashboard.component';
import { LoginComponent } from './UserManagement/login';
import { ProductTypeComponent } from './UserManagement/producttype';
import { ProductsView } from './UserManagement/productsview';
import { BrandComponent } from './UserManagement/brand';
import { TaxComponent } from './UserManagement/taxcenter';

import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './UserManagement/products';
import { MatTableModule } from "@angular/material";
import { MatPaginatorModule } from '@angular/material/paginator';
//import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrModule } from 'ngx-toastr';
import { PopupshowDirective } from './shared/popupshow.directive';
import { CartsComponent } from './UserManagement/carts';
import { BillingsComponent } from './views/billings.component';
import { InvoiceComponent } from './views/invoice.component';
import { AppintializorService, serverConfigInitializerFactory } from './shared/appintializor.service';
import { RegisterComponent } from './views/register.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './views/profile.component';





@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule, HttpClientModule, ToastrModule.forRoot()],
  declarations: [AppComponent, HelloComponent, DashBoardComponent, LoginComponent, ProductsComponent, MainPageComponent, ProductTypeComponent,
    ProductsView, BrandComponent, TaxComponent, PopupshowDirective,CartsComponent, BillingsComponent, InvoiceComponent, RegisterComponent, ProfileComponent],
    providers :[AppintializorService,{ provide: APP_INITIALIZER, useFactory: serverConfigInitializerFactory, deps: [AppintializorService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
