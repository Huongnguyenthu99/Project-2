import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../app/admin/admin.component';
import { ProductManagementComponent } from '../app/admin/product-management/product-management.component';
import { OrdersManagementComponent } from './admin/orders-management/orders-management.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ProductDetailComponent } from './user-layout/main/product-detail/product-detail.component';
import { MainComponent } from './user-layout/main/main.component';
import { CartComponent } from './user-layout/main/cart/cart.component';
import { PaymentComponent } from './user-layout/main/payment/payment.component';
import { SuccessOrderComponent } from './user-layout/main/success-order/success-order.component'

const routes: Routes = [
  //{ path: '',  component: UserLayoutComponent },
  { path: '', component: UserLayoutComponent,
    children:[
      { path: 'main', component: MainComponent },
      { path: 'cart', component: CartComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'success-order', component: SuccessOrderComponent}
    ] },
  {
    path: 'admin', component: AdminComponent,
    children:[
      {path: 'products', component: ProductManagementComponent},
      {path: 'orders', component: OrdersManagementComponent}
    ]      
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
