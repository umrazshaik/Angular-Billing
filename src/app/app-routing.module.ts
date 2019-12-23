import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './UserManagement/dashboard.component';
import { LoginComponent } from './UserManagement/login';
import { ProductsComponent } from './UserManagement/products';
import { MainPageComponent } from './UserManagement/mainpage.component';
import { ProductTypeComponent } from './UserManagement/producttype';
import { ProductsView } from './UserManagement/productsview';
import { BrandComponent } from './UserManagement/brand';
import { TaxComponent } from './UserManagement/taxcenter';
import { CartsComponent } from './UserManagement/carts';
import { BillingsComponent } from './views/billings.component';


const routes: Routes = [
  // { path: 'dashboard', component: DashBoardComponent },
  // {path:'products',component:ProductsComponent,outlet:'mainpage'},
  {
    path: 'mainpage',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'tax',
        component: TaxComponent
      },
      {
        path:'billing',
        component:BillingsComponent
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductTypeComponent
          },
          {
            path: 'brand',
            component: BrandComponent
          },
          {
            path: 'productview',
            component: ProductsView
          },
          {
            path: 'carts',
            component: CartsComponent
          }
        ]
      }
    ]
  },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
