import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { ListStoresInMainAdminComponent } from './components/list-stores-in-main-admin/list-stores-in-main-admin.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { StoreInAdminComponent } from './components/store-in-admin/store-in-admin.component';
import { MainStoreAdminComponent } from './components/main-store-admin/main-store-admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { OrderAdminComponent } from './components/order-admin/order-admin.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderProductsAdminComponent } from './components/order-products-admin/order-products-admin.component';
import { OrderProductAdminComponent } from './components/order-product-admin/order-product-admin.component';
import { ModifiedOrderAdminComponent } from './components/modified-order-admin/modified-order-admin.component';
import { CategoriesAdminComponent } from './components/categories-admin/categories-admin.component';
import { AddCategAdminComponent } from './components/add-categ-admin/add-categ-admin.component';
import { CategoryAdminComponent } from './components/category-admin/category-admin.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';
import { AddProductAdminComponent } from './components/add-product-admin/add-product-admin.component';
import { UpdateProductAdminComponent } from './components/update-product-admin/update-product-admin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HardwareStoresComponent } from './components/hardware-stores/hardware-stores.component';
import { HardwareStoreComponent } from './components/hardware-store/hardware-store.component';
import { StoreLandingPageComponent } from './components/store-landing-page/store-landing-page.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsInCartComponent } from './components/products-in-cart/products-in-cart.component';
import { ProductInCartComponent } from './components/product-in-cart/product-in-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RoutingComponents,
    HomeComponent,
    MainAdminComponent,
    ListStoresInMainAdminComponent,
    RegisterStoreComponent,
    StoreInAdminComponent,
    MainStoreAdminComponent,
    NavBarComponent,
    NavItemComponent,
    OrdersAdminComponent,
    ProductsAdminComponent,
    OrderAdminComponent,
    OrderDetailComponent,
    OrderProductsAdminComponent,
    OrderProductAdminComponent,
    ModifiedOrderAdminComponent,
    CategoriesAdminComponent,
    AddCategAdminComponent,
    CategoryAdminComponent,
    ProductAdminComponent,
    AddProductAdminComponent,
    UpdateProductAdminComponent,
    WelcomeComponent,
    HardwareStoresComponent,
    HardwareStoreComponent,
    StoreLandingPageComponent,
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    ViewProductComponent,
    CartComponent,
    ProductsInCartComponent,
    ProductInCartComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
