import { DOCUMENT } from '@angular/common';
import { Component, Inject, InjectionToken, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/pages/edit-user/services/users.service';
import { PaymentsService } from 'src/app/pages/payments/services/payments.service';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'mvd-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {


  exportUrlStudents: string = `${environment.API}exports/student_course/`
  get window(): Window { return this.document.defaultView; }

  @Input() course_id : any
  dataSource: any
  inscripciones: any;
  displayedColumns: any[];


  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Documento', col: 'documento' },
    { title: 'Email', col: 'email' },
    { title: 'Teléfonos', col: 'phones' },

  ]

  
  constructor(
    private productService: ProductService,
    private paymentService: PaymentsService,
    private router: Router,
    @Inject(DOCUMENT) readonly document: Document
  ) { 
    new MatTableDataSource(this.dataSource)
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(v => v.col)
    this.displayedColumns.push('actions')

    if(this.course_id){
      this.inscripciones = this.paymentService.getPayments(1,100,'','asc', this.course_id)
          .pipe(map(v => v.data.data))
          .subscribe(next => this.loadData(next))
    }
  }


  loadData(data) {

    this.dataSource = data.map(x => {
        return {
          id: x.id,
          name: `${x.user.name} ${x.user.last_name}`,
          documento: `${x.user.account.type_doc_iden} ${x.user.account.n_doc_iden}`,
          email: x.email,
          phones: `${x.user.account.phone_one} / ${x.user.account.phone_two}`,

        }
      })
  }

  editItem(element) {
    this.router.navigate(['/inscripciones', element.id])
    // this.actionChange.emit(action)
  }


  exportStudents(id){
    this.window.open(`${this.exportUrlStudents}?course_id=${id}`, '_parent')
    // return `${this.exportUrlStudents}?course_id=${id}`
  }
}
