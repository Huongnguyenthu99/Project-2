import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {
  userId: string = "";
  listMessage: any[] = [];
  request: string = "";
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.userId = uuidv4();
    
  }

  chatWithBot(){
    let payload = { sender: this.userId, message: this.request };
    console.log(payload);
    this.listMessage.push(payload);
    this.productService.getResponse(payload).subscribe(res=>{
      console.log("response from rasa", res);
      if(res.length >0){
        this.listMessage.push(res[0]);
      }
      this.request = ""
      
    })
  }
}
