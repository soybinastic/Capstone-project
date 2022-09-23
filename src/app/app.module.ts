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
import { TransportAgentComponent } from './components/transport-agent/transport-agent.component';
import { AddTransportAgtComponent } from './components/add-transport-agt/add-transport-agt.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { WarehouseManageProductsComponent } from './components/warehouse-manage-products/warehouse-manage-products.component';
import { WhProductListComponent } from './components/wh-product-list/wh-product-list.component';
import { WhProductInfoComponent } from './components/wh-product-info/wh-product-info.component';
import { WarehouseManagementComponent } from './components/warehouse-management/warehouse-management.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BranchesComponent } from './components/branches/branches.component';
import { AddBranchComponent } from './components/add-branch/add-branch.component';
import { BranchDetailsComponent } from './components/branch-details/branch-details.component';
import { WhAddProductComponent } from './components/wh-add-product/wh-add-product.component';
import { WhReportsComponent } from './components/wh-reports/wh-reports.component';
import { WhProductSatatusReportComponent } from './components/wh-product-satatus-report/wh-product-satatus-report.component';
import { WhAddProductStatsReportComponent } from './components/wh-add-product-stats-report/wh-add-product-stats-report.component';
import { WhProductStatusInfoComponent } from './components/wh-product-status-info/wh-product-status-info.component';
import { WhRecieveProductsComponent } from './components/wh-recieve-products/wh-recieve-products.component';
import { WhAddRecievedProductsComponent } from './components/wh-add-recieved-products/wh-add-recieved-products.component';
import { WhRecieveProductReportInfoComponent } from './components/wh-recieve-product-report-info/wh-recieve-product-report-info.component';
import { MoveProductComponent } from './components/move-product/move-product.component';
import { ListMoveProductsComponent } from './components/list-move-products/list-move-products.component';
import { WhProductCategoriesComponent } from './components/wh-product-categories/wh-product-categories.component';
import { WhNotificationComponent } from './components/wh-notification/wh-notification.component';
import { WhMainPageComponent } from './components/wh-main-page/wh-main-page.component';
import { WhAvailableProductsComponent } from './components/wh-available-products/wh-available-products.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchDashboardComponent } from './components/branch-dashboard/branch-dashboard.component';
import { BranchReportsComponent } from './components/branch-reports/branch-reports.component';
import { WhRequestsComponent } from './components/wh-requests/wh-requests.component';
import { WhDeliverProductComponent } from './components/wh-deliver-product/wh-deliver-product.component';
import { WhDeliverProductReportsComponent } from './components/wh-deliver-product-reports/wh-deliver-product-reports.component';
import { BranchRequestComponent } from './components/branch-request/branch-request.component';
import { BranchSendRequestComponent } from './components/branch-send-request/branch-send-request.component';
import { BranchRequestListComponent } from './components/branch-request-list/branch-request-list.component';
import { BranchNotificationComponent } from './components/branch-notification/branch-notification.component';
import { BranchDisplayComponent } from './components/branch-display/branch-display.component';
import { BranchOrdersComponent } from './components/branch-orders/branch-orders.component';
import { BranchOrderListComponent } from './components/branch-order-list/branch-order-list.component';
import { BranchOrderDetailsComponent } from './components/branch-order-details/branch-order-details.component';
import { BranchOrderProductsComponent } from './components/branch-order-products/branch-order-products.component';
import { BranchPendingProductsInCartComponent } from './components/branch-pending-products-in-cart/branch-pending-products-in-cart.component';
import { BranchBestsellingProductsComponent } from './components/branch-bestselling-products/branch-bestselling-products.component';
import { BranchProductsComponent } from './components/branch-products/branch-products.component';
import { BranchProductListComponent } from './components/branch-product-list/branch-product-list.component';
import { BranchSalesComponent } from './components/branch-sales/branch-sales.component';
import { BranchProductDetailsComponent } from './components/branch-product-details/branch-product-details.component';
import { BranchAllMonthsSalesComponent } from './components/branch-all-months-sales/branch-all-months-sales.component';
import { WhBestsellingProductReportsComponent } from './components/wh-bestselling-product-reports/wh-bestselling-product-reports.component';
import { BranchAddBestsellingReportComponent } from './components/branch-add-bestselling-report/branch-add-bestselling-report.component';
import { BranchBestsellingReportsComponent } from './components/branch-bestselling-reports/branch-bestselling-reports.component';
import { BranchSaleReportsComponent } from './components/branch-sale-reports/branch-sale-reports.component';
import { BranchOrderConfirmationComponent } from './components/branch-order-confirmation/branch-order-confirmation.component';
import { BranchSaleSummaryComponent } from './components/branch-sale-summary/branch-sale-summary.component';
import { BranchJournalComponent } from './components/branch-journal/branch-journal.component';
import { BranchSaleItemComponent } from './components/branch-sale-item/branch-sale-item.component';
import { BranchSaleItemMonthlyComponent } from './components/branch-sale-item-monthly/branch-sale-item-monthly.component';
import { BranchSaleItemYearlyComponent } from './components/branch-sale-item-yearly/branch-sale-item-yearly.component';
import { StoreRegistrationFormComponent } from './components/store-registration-form/store-registration-form.component';
import { PrivacyTermAndConditionsComponent } from './components/privacy-term-and-conditions/privacy-term-and-conditions.component';
import { CompanyRegisteredListComponent } from './components/company-registered-list/company-registered-list.component';
import { CompanyRegisteredDetailComponent } from './components/company-registered-detail/company-registered-detail.component';
import { CustomerVerificationFormComponent } from './components/customer-verification-form/customer-verification-form.component';
import { CustomerVerificationListComponent } from './components/customer-verification-list/customer-verification-list.component';
import { CustomerVerificationDetailsComponent } from './components/customer-verification-details/customer-verification-details.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { OrderRefComponent } from './components/order-ref/order-ref.component';
import { DashboardDetailsComponent } from './components/list-stores-in-main-admin/dashboard-details/dashboard-details.component';
import { BillStatusComponent } from './components/list-stores-in-main-admin/dashboard-details/bill-status/bill-status.component';
import { BillsSummaryComponent } from './components/branch-dashboard/bills-summary/bills-summary-page.component';
import { BillDetailsPageComponent } from './components/branch-dashboard/bill-details/bill-details-page.component';
import { SucessComponent } from './components/redirections/success-checkout/success.component';
import { CancelComponent } from './components/redirections/cancel-checkout/cancel.component';
import { AlertDialogComponent } from './components/redirections/alert-dialog/alert-dialog.component';
import { CustomerMain } from './components/customer-main-page/customer-main.component';
import { CustomerMainHeader } from './components/customer-main-page/customer-main-header/customer-main-header.component';
import { NearbyStoresMap } from './components/nearby-stores-map/nearby-stores-map.component';
import { BranchOrderPreparationComponent } from './components/branch-order-preparation-list/branch-order-preparation.component';

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
    CheckOutComponent,
    TransportAgentComponent,
    AddTransportAgtComponent,
    WarehouseComponent,
    UsersComponent,
    AddUserComponent,
    WarehouseManageProductsComponent,
    WhProductListComponent,
    WhProductInfoComponent,
    WarehouseManagementComponent,
    AddWarehouseComponent,
    UserDetailsComponent,
    BranchesComponent,
    AddBranchComponent,
    BranchDetailsComponent,
    WhAddProductComponent,
    WhReportsComponent,
    WhProductSatatusReportComponent,
    WhAddProductStatsReportComponent,
    WhProductStatusInfoComponent,
    WhRecieveProductsComponent,
    WhAddRecievedProductsComponent,
    WhRecieveProductReportInfoComponent,
    MoveProductComponent,
    ListMoveProductsComponent,
    WhProductCategoriesComponent,
    WhNotificationComponent,
    WhMainPageComponent,
    WhAvailableProductsComponent,
    BranchComponent,
    BranchDashboardComponent,
    BranchReportsComponent,
    WhRequestsComponent,
    WhDeliverProductComponent,
    WhDeliverProductReportsComponent,
    BranchRequestComponent,
    BranchSendRequestComponent,
    BranchRequestListComponent,
    BranchNotificationComponent,
    BranchDisplayComponent,
    BranchOrdersComponent,
    BranchOrderListComponent,
    BranchOrderDetailsComponent,
    BranchOrderProductsComponent,
    BranchPendingProductsInCartComponent,
    BranchBestsellingProductsComponent,
    BranchProductsComponent,
    BranchProductListComponent,
    BranchSalesComponent,
    BranchProductDetailsComponent,
    BranchAllMonthsSalesComponent,
    WhBestsellingProductReportsComponent,
    BranchAddBestsellingReportComponent,
    BranchBestsellingReportsComponent,
    BranchSaleReportsComponent,
    BranchOrderConfirmationComponent,
    BranchSaleSummaryComponent,
    BranchJournalComponent,
    BranchSaleItemComponent,
    BranchSaleItemMonthlyComponent,
    BranchSaleItemYearlyComponent,
    StoreRegistrationFormComponent,
    PrivacyTermAndConditionsComponent,
    CompanyRegisteredListComponent,
    CompanyRegisteredDetailComponent,
    CustomerVerificationFormComponent,
    CustomerVerificationListComponent,
    CustomerVerificationDetailsComponent,
    CustomerProfileComponent,
    CustomerInformationComponent,
    OrderRefComponent, 
    DashboardDetailsComponent,
    BillStatusComponent,
    BillsSummaryComponent,
    BillDetailsPageComponent, 
    SucessComponent,
    CancelComponent,
    AlertDialogComponent,
    CustomerMain,
    CustomerMainHeader,
    NearbyStoresMap,
    BranchOrderPreparationComponent
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
