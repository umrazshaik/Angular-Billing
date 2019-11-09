import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './UserManagement/mainpage.component';
import { HelloComponent } from './hello.component';
 import { DashBoardComponent} from './UserManagement/dashboard.component';
import { LoginComponent } from './UserManagement/login';
import { ProductTypeComponent } from './UserManagement/producttype';
import { ProductsView } from './UserManagement/productsview';
import { BrandComponent } from './UserManagement/brand';
import { TaxComponent } from './UserManagement/taxcenter';

import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './UserManagement/products';
import {MatTableModule} from "@angular/material";
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  imports:      [ BrowserModule, FormsModule ,AppRoutingModule,MatTableModule,MatPaginatorModule,BrowserAnimationsModule ],
  declarations: [ AppComponent, HelloComponent,DashBoardComponent,LoginComponent,ProductsComponent ,MainPageComponent,ProductTypeComponent,
    ProductsView,BrandComponent,TaxComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
