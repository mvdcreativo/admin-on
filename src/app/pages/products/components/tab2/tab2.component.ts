import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'mvd-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {

  @Output() submit = new EventEmitter<any>();


  productEdit$: Observable<Product>;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productEdit$ = this.productService.productOnEdit
    
    
  }


  onSubmit(){
    this.submit.emit(3)
  }

}
