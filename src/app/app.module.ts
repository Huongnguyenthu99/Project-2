import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { ChatbotRasaModule } from 'angular-chat-widget-rasa';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AdminComponent } from './admin/admin.component';
//import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from "ng-zorro-antd/message";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { TopBarComponent } from './user-layout/top-bar/top-bar.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { OrdersManagementComponent } from './admin/orders-management/orders-management.component';
import { ChatbotComponent } from './user-layout/chatbot/chatbot.component';
import { MainComponent } from './user-layout/main/main.component';
import { ProductDetailComponent } from './user-layout/main/product-detail/product-detail.component';
import { FooterComponent } from './user-layout/footer/footer.component';
import { CartComponent } from './user-layout/main/cart/cart.component';
import { PaymentComponent } from './user-layout/main/payment/payment.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SuccessOrderComponent } from './user-layout/main/success-order/success-order.component';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserLayoutComponent,
    TopBarComponent,
    ProductManagementComponent,
    OrdersManagementComponent,
    ChatbotComponent,
    MainComponent,
    ProductDetailComponent,
    FooterComponent,
    CartComponent,
    PaymentComponent,
    SuccessOrderComponent,
  ],
  imports: [
    //IconsProviderModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // ng zorro
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    ChatbotRasaModule,
    NzBadgeModule,
    NzToolTipModule,
    NzUploadModule,
    NzInputModule,
    NzButtonModule
  ],
  exports:[
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    ChatbotRasaModule,
    NzBadgeModule,
    NzUploadModule,
    NzInputModule,
    NzButtonModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    NzMessageService,
    NzNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
