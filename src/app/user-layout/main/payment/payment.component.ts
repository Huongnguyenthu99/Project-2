import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CartService } from '../../../service/cart.service'
import { Item } from '../../../model/item-cart.model';
import { provinces } from '../../../../../src/assets/source/province';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentInfo: FormGroup;
  submitted: boolean = false;
  listItem: Item[] = [];
  total: number = 0;
  listProvince = provinces;
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private notification: NzNotificationService,
    private productService: ProductService,
    private router: Router
  ) { 
    this.paymentInfo = this.fb.group({
      fullName: ["", Validators.required],
      phoneNumber: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      province: ["", Validators.required],
      address: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.listItem = this.cartService.getItem();
    this.total = this.cartService.totalPayment();
  }

  get f(){ return this.paymentInfo.controls }

  getOrder(){
    this.submitted = true;
    // this.notification.blank('Đặt hàng thành công', 'Qúy khách vui lòng để ý điện thoại để xác nhận đơn hàng thành công từ nhân viên của hệ thống. Cảm ơn quý khách đã mua hàng!')
    let payload = {customer: this.paymentInfo.value, products: this.listItem}
    console.log("payload of payment", payload)
    this.productService.order(payload).subscribe(res=>{
      console.log("ok");
      this.router.navigate(['/success-order'])
      this.cartService.clearCart();
    })
  }
}
