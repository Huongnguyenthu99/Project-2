import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Item } from '../../model/item-cart.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  listItemCart: Item[] = [];
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listItemCart = this.cartService.getItem();
    console.log("product", this.listItemCart)
  }
  goToCart(){
    this.listItemCart = this.cartService.getItem();
    console.log("go To Cart", this.listItemCart);
    this.router.navigate(['/cart']);
  }

}
