import { Injectable } from '@angular/core';
import { Item } from '../model/item-cart.model'

@Injectable({
    providedIn: 'root'
})
export class CartService{
    listItem: Item[] = [];
    totalPrices: number = 0;
    constructor(){

    }
    getItem(){
        return this.listItem;
    }
    addToCart(product: any){
        const item = {
            product: product,
            count: 1,
        }
        const l = this.listItem.filter(en => en.product.id === product.id).length;
        if(l === 0){            
            this.listItem.push(item);
            return;
        } 
        item.count += 1;
        this.listItem = this.listItem.filter(en => en.product.id !== product.id);
        this.listItem.push(item);
    }
    removeAllItem(id: string){
        this.listItem = this.listItem.filter(en => en.product.id !== id);
    }
    removeOneItem(item: any){
        if(item.count == 1){
            this.listItem = this.listItem.filter(en => en.product.id !== item.product.id);
            return;
        }
        item.count -= 1;
    }
    clearCart(){
        this.listItem = [];
        return this.listItem;
    }
    totalPayment(){
        this.listItem.forEach(en => {
            this.totalPrices += en.product.price*en.count;
          });
        return this.totalPrices;
    }
}
