import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { Item } from "../../../model/item-cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listItemCart: Item[] = [];
  totalPrice: number = 0;
  isVisiblePayment: boolean = false;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.listItemCart = this.cartService.getItem();
    this.totalPrice = this.cartService.totalPayment();
  }
  addItem(prod: any){
    console.log("addItem", prod.product);
    this.cartService.addToCart(prod.product);
  }
  removeItem(item: any){
    this.cartService.removeOneItem(item);
  }
}
