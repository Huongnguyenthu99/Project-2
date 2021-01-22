import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Orders } from '../../../app/model/order.module';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.scss']
})
export class OrdersManagementComponent implements OnInit {
  lstOrder: Orders[] = [];
  textSearch: string = "";
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.productService.getOrder().subscribe(res=>{
      console.log("res", res);
      this.lstOrder = res;
    })
  }
  showModal(){

  }
  showConfirm(product: any){

  }
  editProduct(product: any){

  }
}
