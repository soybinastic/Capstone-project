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
import { TransportAgentComponent } from './components/transport-agent/transport-agent.component';
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
import { WarehouseAccessGuard } from './warehouse-access.guard';
import { WhMainPageComponent } from './components/wh-main-page/wh-main-page.component';
import { WhAvailableProductsComponent } from './components/wh-available-products/wh-available-products.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchDashboardComponent } from './components/branch-dashboard/branch-dashboard.component';
import { WhRequestsComponent } from './components/wh-requests/wh-requests.component';
import { BranchReportsComponent } from './components/branch-reports/branch-reports.component';
import { WhDeliverProductComponent } from './components/wh-deliver-product/wh-deliver-product.component';
import { WhDeliverProductReportsComponent } from './components/wh-deliver-product-reports/wh-deliver-product-reports.component';
import { BranchRequestComponent } from './components/branch-request/branch-request.component';
import { BranchSendRequestComponent } from './components/branch-send-request/branch-send-request.component';
import { BranchRequestListComponent } from './components/branch-request-list/branch-request-list.component';
import { BranchNotificationComponent } from './components/branch-notification/branch-notification.component';
import { BranchOrdersComponent } from './components/branch-orders/branch-orders.component';
import { BranchOrderListComponent } from './components/branch-order-list/branch-order-list.component';
import { BranchOrderDetailsComponent } from './components/branch-order-details/branch-order-details.component';
import { BranchPendingProductsInCartComponent } from './components/branch-pending-products-in-cart/branch-pending-products-in-cart.component';
import { BranchBestsellingProductsComponent } from './components/branch-bestselling-products/branch-bestselling-products.component';
import { BranchProductsComponent } from './components/branch-products/branch-products.component';
import { BranchProductListComponent } from './components/branch-product-list/branch-product-list.component';
import { BranchSalesComponent } from './components/branch-sales/branch-sales.component';
import { BranchProductDetailsComponent } from './components/branch-product-details/branch-product-details.component';
import { BranchUserAccessGuard } from './branch-user-access.guard';
import { WhBestsellingProductReportsComponent } from './components/wh-bestselling-product-reports/wh-bestselling-product-reports.component';
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
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { CompanyRegisteredListComponent } from './components/company-registered-list/company-registered-list.component';
import { CompanyRegisteredDetailComponent } from './components/company-registered-detail/company-registered-detail.component';
import { CustomerVerificationFormComponent } from './components/customer-verification-form/customer-verification-form.component';
import { CustomerAccessGuard } from './customer-access.guard';
import { CheckOutAccessGuard } from './check-out-access.guard';
import { CustomerVerificationListComponent } from './components/customer-verification-list/customer-verification-list.component';
import { CustomerVerificationDetailsComponent } from './components/customer-verification-details/customer-verification-details.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { DashboardDetailsComponent } from './components/list-stores-in-main-admin/dashboard-details/dashboard-details.component';
import { BillsSummaryComponent } from './components/branch-dashboard/bills-summary/bills-summary-page.component';
import { BillDetailsPageComponent } from './components/branch-dashboard/bill-details/bill-details-page.component';
import { SucessComponent } from './components/redirections/success-checkout/success.component';
import { CancelComponent } from './components/redirections/cancel-checkout/cancel.component';
import { CustomerMain } from './components/customer-main-page/customer-main.component';
import { NearbyStoresMap } from './components/nearby-stores-map/nearby-stores-map.component';
import { CashierAccessGuard } from './cashier-access.guard';
import { TransportAgentAccessGuard } from './transport-agent-access.guard';
import { BranchOrderPreparationComponent } from './components/branch-order-preparation-list/branch-order-preparation.component';
import { SalesclerkAccessGuard } from './salesclerk-access.guard';
// import { OrderRefComponent } from './components/customer-information/customer-information.component';

const routes: Routes = [
  // {path:'', redirectTo:'/hardware-stores', pathMatch:'full'},
  { path: '', component : CustomerMain, children :[
    { path : '', redirectTo: '/stores', pathMatch: 'full' },
    { path : 'stores', component : HardwareStoresComponent },
    { path : 'store/:branchId/:hardwareStoreId', component : StoreLandingPageComponent, children : [
      { path : 'products/:branchId', component : ProductsComponent }
    ] },
    {path : 'view-product/:hardwareStoreId/:productId/:branchId', component: ViewProductComponent},
    {path : 'cart/:hardwareStoreId/:branchId/:from/:productId', component : CartComponent},
    {path : 'check-out/:hardwareStoreId/:branchId', component: CheckOutComponent, canActivate : [CheckOutAccessGuard]},
    { path : 'nearby-stores', component : NearbyStoresMap, canActivate : [CustomerAccessGuard] }
  ] },
  {path : 'ware-house', redirectTo:'/ware-house/main-page', pathMatch: 'full'},
  {path : 'branch', redirectTo: '/branch/dashboard', pathMatch: 'full'},
  {path : 'branch/products', redirectTo : '/branch/products/list', pathMatch : 'full'},
  {path : 'branch/orders', redirectTo : '/branch/orders/list', pathMatch : 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path : 'home', component: HomeComponent},
  {path: 'main-admin', component: MainAdminComponent, canActivate:[MainAdminGuard], children :[
    { path: 'store-list', component: ListStoresInMainAdminComponent },
    { path : 'dashboard-details/:id/:branchId', component : DashboardDetailsComponent },
    { path: 'register-store', component: RegisterStoreComponent },
    { path: 'company-registered-list', component: CompanyRegisteredListComponent },
    { path: 'details/:id', component: CompanyRegisteredDetailComponent },
    {path : 'user-verification-list', component : CustomerVerificationListComponent},
    {path : 'verification-details/:id', component : CustomerVerificationDetailsComponent}
  ]},
  {path: 'store-admin', component: MainStoreAdminComponent,canActivate:[StoreAdminAccessGuard]},
  {path : 'welcome', component : WelcomeComponent},
  {path : 'hardware-stores', component: HardwareStoresComponent},
  {path : 'hardware-store-page/:hardwareStoreId', component : StoreLandingPageComponent},
  {path:'products/:branchId/:hardwareStoreId', component: ProductsComponent, children:[
    {path: 'product-category/:categoryId/:branchId/:hardwareStoreId', component: ProductListComponent}
  ]},
  {path : 'ware-house', component : WarehouseComponent, canActivate: [WarehouseAccessGuard],children:[
    {path : 'main-page', component : WhMainPageComponent},
    {path : 'users', component : UsersComponent},
    {path : 'add-user', component : AddUserComponent},
    {path : 'user-details/:userId', component : UserDetailsComponent},
    {path: 'warehouse-manage-products', component: WarehouseManageProductsComponent, children:[ {path : '', component: WhProductListComponent}, 
      {path : 'wh-product-info/:productId/:warehouseId', component: WhProductInfoComponent},
      {path : 'add-product', component : WhAddProductComponent},
      {path : 'transfer/:productId', component : MoveProductComponent},
      {path : 'transfer-products', component : ListMoveProductsComponent},
      {path : 'available-products', component : WhAvailableProductsComponent},
      {path : 'deliver-product/:productId', component : WhDeliverProductComponent}
    ]},
    {path : 'product-categories', component : WhProductCategoriesComponent},
    {path : 'notifications', component : WhNotificationComponent},
    {path: 'warehouses', component : WarehouseManagementComponent},
    {path: 'add-warehouse', component : AddWarehouseComponent},
    {path : 'branches', component : BranchesComponent},
    {path : 'add-branch', component : AddBranchComponent},
    {path : 'branch-details/:branchId', component : BranchDetailsComponent},
    {path : 'reports', component : WhReportsComponent, children : [
      {path : 'status-product', component : WhProductSatatusReportComponent},
      {path : 'add-status-product', component : WhAddProductStatsReportComponent} ,
      {path : 'product-status-info/:warehouseReportId', component : WhProductStatusInfoComponent},
      {path : 'recieve-products', component : WhRecieveProductsComponent},
      {path : 'attach-recieved-product', component: WhAddRecievedProductsComponent},
      {path : 'recieve-product-info/:warehouseReportId', component : WhRecieveProductReportInfoComponent},
      {path : 'branch-requests', component : WhRequestsComponent},
      {path : 'deliver-products', component : WhDeliverProductReportsComponent},
      {path : 'best-selling', component : WhBestsellingProductReportsComponent}
    ]}
  ]},
  {path : 'branch', component : BranchComponent,canActivate:[BranchUserAccessGuard] , children : [
    {path : 'dashboard', component : BranchDashboardComponent, canActivate:[StoreAdminAccessGuard]},
    {path : 'notifications', component : BranchNotificationComponent, canActivate:[StoreAdminAccessGuard]},
    {path : 'pending-products-in-cart', component : BranchPendingProductsInCartComponent, canActivate:[StoreAdminAccessGuard]},
    {path : 'best-selling-products', component : BranchBestsellingProductsComponent, canActivate:[StoreAdminAccessGuard]},
    {path : 'sales', component : BranchSalesComponent, canActivate:[StoreAdminAccessGuard]},
    {path : 'sales-summary', component : BranchSaleSummaryComponent},
    {path : 'view-sale-item', component : BranchSaleItemComponent},
    {path : 'view-sale-item-monthly', component : BranchSaleItemMonthlyComponent},
    {path : 'view-sale-item-yearly', component : BranchSaleItemYearlyComponent},
    {path : 'products', component : BranchProductsComponent, canActivate:[StoreAdminAccessGuard] , children : [
      {path : 'list', component : BranchProductListComponent},
      {path : 'details/:hardwareProductId/:branchId', component : BranchProductDetailsComponent}
    ]},
    {path : 'orders', component : BranchOrdersComponent, children:[
      {path : 'list', component : BranchOrderListComponent},
      {path : 'details/:orderId', component : BranchOrderDetailsComponent},
      {path : 'confirmation', component : BranchOrderConfirmationComponent, canActivate : [CashierAccessGuard]},
      {path : 'to-prepare', component : BranchOrderPreparationComponent, canActivate : [SalesclerkAccessGuard]}
    ]},
    {path : 'reports', component : BranchReportsComponent, canActivate:[StoreAdminAccessGuard] , children:[
      {path : 'request', component : BranchRequestComponent, children : [
        {path : 'send', component : BranchSendRequestComponent},
        {path : 'list', component : BranchRequestListComponent}
      ]},
      {path : 'best-selling', component : BranchBestsellingReportsComponent},
      {path : 'sales', component : BranchSaleReportsComponent},
      {path : 'journal', component : BranchJournalComponent}
    ]},
    { path : 'bills', component : BillsSummaryComponent, canActivate : [StoreAdminAccessGuard] },
    { path : 'bill-details/:dashboardId', component : BillDetailsPageComponent, canActivate : [StoreAdminAccessGuard] }
  ]},
  {path : 'registration', component : StoreRegistrationFormComponent},
  {path : 'privacy-and-termconditions', component : PrivacyTermAndConditionsComponent},
  {path : 'verification', component : CustomerVerificationFormComponent, canActivate : [CustomerAccessGuard]},
  {path : 'account', component : CustomerProfileComponent, 
  canActivate : [CustomerAccessGuard]},
  {path : 'my-information', component : CustomerInformationComponent, canActivate : [CustomerAccessGuard]},
  { path : 'success/:dashboardId', component : SucessComponent, canActivate : [StoreAdminAccessGuard]},
  { path : 'cancel', component : CancelComponent, canActivate : [StoreAdminAccessGuard] }
  // {path : 'order-refs', component : OrderRefComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent,RegisterComponent,WelcomeComponent,MainAdminComponent,MainStoreAdminComponent,HardwareStoresComponent, StoreLandingPageComponent,ProductsComponent];
