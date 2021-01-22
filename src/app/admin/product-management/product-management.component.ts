import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Products } from '../../../app/model/product.model';
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from "ng-zorro-antd/message";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  lstProduct: Products[] = [];
  lstProductFilter: Products[] = [];
  isVisible: boolean = false;
  textSearch: string = "";
  categoryData: any[] = [];
  newProduct: FormGroup;
  // newProducts: Products = {  
  //   id: "",
  //   productName: "",
  //   price: "",
  //   category: "",
  //   description: "",
  // };
  lstProductName: any[] = [];
  loading: boolean = false;
  imageUrl: SafeResourceUrl = "";
  submitted: boolean = false;
  fileData: any;

  constructor(
    private productService: ProductService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private modal: NzModalService
  ) {
    this.newProduct = this.fb.group({
      id: "",
      productName: ["", Validators.required],
      productCode: ["", Validators.required],
      amount: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      description: [null, Validators.required],
      imageUrl: [""],
    });
   }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges():void{
    console.log(this.imageUrl);
    
  }

  showConfirm(productId): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa sản phẩm này?</i>',
      nzContent: '<b></b>',
      nzOnOk: () => {
        console.log('OK');
        this.deleteProduct(productId);
      }
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[])=>{
    return new Observable((observer: Observer<boolean>)=>{
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if(!isJpgOrPng){
        this.msg.error("Bạn chỉ có thể upload file Jpg");
        observer.complete();  
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if(!isLt2M){
        this.msg.error("Kích thước ảnh phải nhỏ hơn 2MB");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    })
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener("load", ()=> callback
      (reader.result!.toString()));
      reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void{
    console.log("file", info.file);
    switch (info.file.status){
      case "uploading": 
        this.loading = true;
        break;
      case "done":
        this.getBase64(info.file!.originFileObj!, (img: string)=>{
          this.loading = false;
          this.imageUrl = img;
          console.log("hello");
        })
        break;
      case "error":
        this.msg.error("Network error");
        this.loading = false;
        break;
    }
  }
  
  get f(){ return this.newProduct.controls};

  getData(){
    this.productService.getProduct().subscribe(res=>{
      console.log("res", res);
      this.lstProduct = res;
      this.lstProductFilter = this.lstProduct;
    })
    this.productService.getCategoryData().subscribe(res=>{
      this.categoryData = res;
      console.log(res);
    })
  }
  handleCancel(){
    this.isVisible = false;
  }
  editProduct(prod: Products){
    this.submitted = false;
    this.isVisible = true;
    this.newProduct.patchValue({
      id: prod.id,
      productName: prod.productName,
      productCode: prod.productCode,
      amount: prod.amount,
      category: prod.category,
      price: prod.price,
      description: prod.description,
      imageUrl: prod.imageUrl,
    })
  }
  showModal(){
    this.submitted = false;
    //this.f.reset();
    this.isVisible = true;
    this.newProduct.patchValue({
      id: "",
      productName: "",
      productCode: " ",
      amount: "",
      category: [null],
      price: "",
      description: "",
      imageUrl: ""
    })
  }

  handleOK(){
    this.submitted = true;
    const newItem = this.newProduct.value;
    console.log(this.newProduct.value);
    if(!this.newProduct.invalid){
      if (newItem.id === "") {//add
        this.productService.addProduct(newItem).subscribe(res => {
          this.lstProductFilter.push(res);
        })
      }else{//edit
        //let p = { id: newItem.id, prodIn: newItem};
        this.productService.editProduct(newItem.id, newItem).subscribe(res => {
          this.lstProductFilter = this.lstProductFilter.filter(en=> en.id !== newItem.id);
          this.lstProductFilter.push(newItem);
        })
      }
      this.isVisible = false;
    }
    else{
      console.log("khoong ddc luuw")
    }
  }
  deleteProduct(id: string){
    if(id != ""){
      this.productService.deleteProduct(id).subscribe(res=>{
        this.lstProductFilter = this.lstProductFilter.filter(en=> en.id!==id);
      })
    }
  }
  searchName(text: string){
    if(text != ""){
      this.lstProductFilter = this.lstProduct.filter(en=>en.productName.toLowerCase().includes(text.toLowerCase()));
      return;
    }
    this.lstProductFilter = this.lstProduct;
  }
  // test(){
  //   this.productService.upload
  // }
  onFileChange(event: any){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.fileData = event.target.files[0];
      reader.readAsDataURL(this.fileData);      
    }
    console.log("form", this.fileData)
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    console.log("formData", formData)
    this.productService.upload(formData).subscribe(res => {
      //this.imageUrl = res.blob()
      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.fileName);
      alert('SUCCESS !!');
    })
  }
}
