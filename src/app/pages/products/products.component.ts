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
      { title: 'Titulo ', col: 'title' },
      { title: 'Profesor', col: 'user_instructor' },
      { title: 'Cupos', col: 'cupos', class: 'class' },
      { title: 'Inicio ', col: 'date_ini', pipe: 'dd/MM/yyyy'}
      
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
  subscriptions: Subscription[]=[];

  statusSelected: number[] = [1,3];
  checkboxes: any = [
    {name: "Activos",value:true , id:1},
    {name: "Destacados",value:true, id:3 },
    {name: "Inactivos",value:false, id:2 },
  ]

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getProducts(e.pageIndex + 1, e.pageSize)

  }
  /////////////
  changeCheck(){
    this.statusSelected = this.checkboxes.filter(v=> v.value).map(v=>v.id)
    // console.log(this.statusSelected);
    this.getProducts(this.pageDefault, this.perPage, this.filter, this.orden, this.statusSelected)
    
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.result = this.productService.resultItems$

  }
  
  
  ngOnInit(): void {
    this.getProducts(this.pageDefault, this.perPage, this.filter, this.orden, this.statusSelected)

  }





  getProducts(currentPage?, perPage?, filter?, sort?, status?) {
    this.subscriptions.push(
      this.productService.getProducts(currentPage, perPage, filter, sort, status).subscribe(next => this.loadData())
    )
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        let styleClass = null
        if(x.cupos_confirmed >=  x.cupos - 3){
          styleClass = "text-red"
        }
        return {
          id: x.id,
          title: x.title,
          user_instructor: x.user_instructor.name,
          status_id: x.status_id,
          cupos: `${x.cupos_confirmed}/${x.cupos}`,
          date_ini: x.date_ini,
          class: styleClass


        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter){
    this.getProducts(this.pageDefault, this.perPage, filter, this.orden, this.statusSelected)
  }

  deleteItem(id):Observable<any>{
    return this.productService.deleteProduct(id)
  }

  itemAction(event){
    // console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/productos/producto', event.element.id])    
    }

    if(event.action === "clone"){
      console.log(event.element);
      this.subscriptions.push(
        this.productService.duplicateProduct(event.element.id).subscribe()
      )
    }
    
  }



    ngOnDestroy(): void {

      this.subscriptions.map(v=>v.unsubscribe())
    }
}
