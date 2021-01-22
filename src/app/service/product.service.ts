import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Constant } from '../share/constant.class';
import { Observable } from 'rxjs';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProduct(): Observable<any>{
    return this.httpClient.get(Constant.API_PRODUCT);
  }
  getCategoryData(): Observable<any>{
    return this.httpClient.get(Constant.CATEGORY_DATA);
  }
  addProduct(product: any): Observable<any>{
    return this.httpClient.post(Constant.ADD_PRODUCT, product);
  }
  editProduct(id: string, prodIn: any): Observable<any>{
    return this.httpClient.put(Constant.EDIT_PRODUCT + '/' + id, prodIn);
  }
  deleteProduct(id: string): Observable<any>{
    return this.httpClient.delete(Constant.EDIT_PRODUCT + '/' + id);
  }
  getResponse(payload: any): Observable<any>{
    return this.httpClient.post(Constant.GET_MESS, payload);
  }
  getProductById(productId: any): Observable<any>{
    return this.httpClient.get(Constant.API_PRODUCT + '/' + productId);
  }
  upload(file: any):Observable<any>{
    return this.httpClient.post(Constant.API_PRODUCT + '/upload', file)
  }
  order(payload: any):Observable<any>{
    return this.httpClient.post(Constant.ORDER, payload);
  }
  getOrder():Observable<any>{
    return this.httpClient.get(Constant.ORDER);
  }
}
