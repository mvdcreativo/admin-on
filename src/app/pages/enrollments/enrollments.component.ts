import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Fields } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { Order } from '../payments/interfaces/order';
import { EnrollmentsService } from "./services/enrollment.service";

@Component({
  selector: 'mvd-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  
})
export class EnrollmentsComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Email', col: 'email' },
    { title: 'Teléfono ', col: 'phone_one' },
    { title: 'Fecha', col: 'created_at', pipe: "dd/MM/yyyy" },

  ]

  dataSource: Observable<any[]>;

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroption: Subscription;

  fields: Fields[]

  /////////////


  constructor(
    private enrollmentsService: EnrollmentsService,
    public dialog: MatDialog,
    private statusService: StatusService,
    private router: Router
  ) {
    this.result = this.enrollmentsService.resultItems$

  }


  ngOnInit(): void {
    this.getEnrollments(this.pageDefault, this.perPage, this.filter, this.orden)


  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getEnrollments(e.pageIndex + 1, e.pageSize)

  }



  getEnrollments(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.enrollmentsService.getEnrollments(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data
      .filter(v=> v.user !== null)
      .map(x => {
        return {
          id: x.id,
          created_at: x.created_at,
          name: `${x.user.name} ${x.user?.last_name}`,
          email: x.user.email,
          phone_one: x?.user.phone_one,

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getEnrollments(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.enrollmentsService.deleteEnrollment(id)
  }

  itemAction(event) {
    console.log(event);

    if (event.action === "delete") {
      this.deleteItem(event.element.id).pipe(take(1)).subscribe(res => console.log(res))
    }

    if (event.action === "edit") {
      
      this.router.navigate(['/inscripciones' , event.element.id])
    }

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscroption.unsubscribe()
  }

  add(){
    
  }

  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '850px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateEnrollment(result)
          
        }else{
          this.storeEnrollment(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : Order) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'last_name', type: 'text', value: elementEdit?.last_name, label: 'Apellido', validators: [Validators.required] },
      { nameControl: 'email', type: 'text', value: elementEdit?.email, label: 'Email', validators: [Validators.required, Validators.email] },
      { nameControl: 'phone_one', type: 'text', value: elementEdit?.phone_one, label: 'Teléfono', validators: [Validators.required] },
      { nameControl: 'status_mp', type: 'text', value: elementEdit?.status_mp, label: 'Estado', validators: [Validators.required] },

    ]

    return fields
  }




  storeEnrollment(data){
    this.enrollmentsService.storeEnrollment(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateEnrollment(data){
    this.enrollmentsService.updateEnrollment(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }


  
}
