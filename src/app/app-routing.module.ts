import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HardwareStoresComponent } from './components/hardware-stores/hardware-stores.component';
import { HomeComponent } from './components/home/home.component';
import { ListStoresInMainAdminComponent } from './components/list-stores-in-main-admin/list-stores-in-main-admin.component';
import { LoginComponent } from './components/login/login.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { MainStoreAdminComponent } from './components/main-store-admin/main-store-admin.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreLandingPageComponent } from './components/store-landing-page/store-landing-page.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MainAdminGuard } from './main-admin.guard';
import { StoreAdminAccessGuard } from './store-admin-access.guard';

const routes: Routes = [
  {path:'', redirectTo:'/welcome', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path : 'home', component: HomeComponent},
  {path: 'main-admin', component: MainAdminComponent, canActivate:[MainAdminGuard]},
  {path: 'store-admin', component: MainStoreAdminComponent,canActivate:[StoreAdminAccessGuard]},
  {path : 'welcome', component : WelcomeComponent},
  {path : 'hardware-stores', component: HardwareStoresComponent},
  {path : 'hardware-store-page/:hardwareStoreId', component : StoreLandingPageComponent, children:[
    {path:'products/:hardwareStoreId', component: ProductsComponent, children:[
      {path: 'product-category/:categoryId/:hardwareStoreId', component: ProductListComponent}
    ]}
  ]},
  {path : 'view-product/:hardwareStoreId/:productId', component: ViewProductComponent},{path : 'cart/:hardwareStoreId/:from/:productId', component : CartComponent},
  {path : 'check-out/:hardwareStoreId', component: CheckOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent,RegisterComponent,WelcomeComponent,MainAdminComponent,MainStoreAdminComponent,HardwareStoresComponent, StoreLandingPageComponent,ProductsComponent];
