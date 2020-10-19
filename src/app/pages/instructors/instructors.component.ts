import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';


import { Validators } from "@angular/forms";
import {default as _rollupMoment} from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { InstructorsService } from './services/instructors.service';


const moment = _rollupMoment;
@Component({
  selector: 'mvd-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class InstructorsComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Foto', col: 'image' },
    { title: 'Nombre', col: 'name' },
    { title: 'Email', col: 'email' },

  ]

  dataSource: Observable<any[]>;

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroptions: Subscription[] = [];

  /////////////


  constructor(
    private instructorsService: InstructorsService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.result = this.instructorsService.resultItems$

  }


  ngOnInit(): void {
    
    this.getInstructors(this.pageDefault, this.perPage, this.filter, this.orden)


  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getInstructors(e.pageIndex + 1, e.pageSize)

  }



  getInstructors(currentPage?, perPage?, filter?, sort?) {
    this.subscroptions.push(this.instructorsService.getInstructors(currentPage, perPage, filter, sort).subscribe(next => this.loadData())) ;
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: `${x.name} ${x.last_name}`,
          email: x.email,
          image: x.account.image

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getInstructors(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.instructorsService.deleteInstructor(id)
  }

  itemAction(event) {
    console.log(event);

    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/docentes/editar-usuario', event.element.id])    
    }
    

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscroptions.map(v=> v.unsubscribe())
  }

  add(){
    
  }





  
}
