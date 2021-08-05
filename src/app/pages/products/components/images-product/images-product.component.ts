import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'mvd-images-product',
  templateUrl: './images-product.component.html',
  styleUrls: ['./images-product.component.scss']
})
export class ImagesProductComponent implements OnInit {

  @Output() submit : EventEmitter<any> = new EventEmitter<any>();


  productEdit$: Observable<Product>;
  product: Product;

  constructor(
    private productServices: ProductService

  ) {
    this.productEdit$ = this.productServices.productOnEdit
  }

  ngOnInit(): void {
    this.productEdit$.subscribe(res=> {
      this.product = res

    })
  }

  onSubmit(){
    this.submit.emit(-1)
  }


}
