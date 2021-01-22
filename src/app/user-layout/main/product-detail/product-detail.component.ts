import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { CartService } from "../../../service/cart.service";
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  productId: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(res=>{
      this.product = res;
      console.log("product detail:", res);  
    })
  }
  addToCart(){
    this.cartService.addToCart(this.product);
    this.notification.blank('Thêm 1 sản phẩm vào giỏ','')
  }
  buyNow(){
    this.cartService.addToCart(this.product);
    this.router.navigate(['/cart']);
    this.notification.blank('Thêm 1 sản phẩm vào giỏ','')
  }

}
