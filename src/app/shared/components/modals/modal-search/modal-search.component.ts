import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from 'src/app/pages/products/interfaces/product';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductService } from 'src/app/pages/products/services/product.service';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { Column } from '../../data-table/interfaces/table';
import { ModalReutilComponent } from '../modal-reutil/modal-reutil.component';

@Component({
  selector: 'mvd-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss']
})
export class ModalSearchComponent implements OnInit {

  constructor(

  ) {

  }
    
  ngOnInit(): void {
    
  }

  
}
