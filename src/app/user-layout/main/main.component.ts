import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { CartService } from '../../service/cart.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listProduct: any[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.productService.getProduct().subscribe(res=>{
      this.listProduct = res;
      console.log("product list",res);
    })
  }
  addToCart(){

  }

}
