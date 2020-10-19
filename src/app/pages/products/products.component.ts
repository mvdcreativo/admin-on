import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductService } from "./services/product.service";
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from './interfaces/product';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Router } from '@angular/router';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';




@Component({
  selector: 'mvd-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {
  // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ////COLUMNAS TABLA
    public columns: Column[] = [
      { title: 'ID ', col: 'id' },
      { title: 'Title ', col: 'title' },
      { title: 'Profesor', col: 'user_instructor' },
      { title: 'Categoría', col: 'category' },
    ]

  dataSource:Observable<any[]>;
  products: Product[];

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscription: Subscription;


  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getProducts(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.result = this.productService.resultItems$

  }
  
  
  ngOnInit(): void {
    
    this.getProducts(this.pageDefault, this.perPage, this.filter, this.orden)

  }





  getProducts(currentPage?, perPage?, filter?, sort?) {
    this.subscription = this.productService.getProducts(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          title: x.title,
          user_instructor: x.user_instructor.name,
          status_id: x.status_id,


        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter){
    this.getProducts(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id):Observable<any>{
    return this.productService.deleteProduct(id)
  }

  itemAction(event){
    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/productos/producto', event.element.id])    
    }
    
  }



    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscription.unsubscribe()
    }
}
