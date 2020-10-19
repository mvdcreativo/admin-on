import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { IconsService } from 'src/app/shared/services/icons/icons.service';
import { RoleService } from 'src/app/shared/services/roles/role.service';
import { Student } from './interfaces/student';
import { StudentService } from './services/student.service';
import { Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'mvd-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
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
  itemEdit: Student;
  fields: Fields[]
  optionsRoles: OptionSelect[];

  /////////////


  constructor(
    private studentsService: StudentService,
    public dialog: MatDialog,
    private roleService: RoleService,
    private router: Router
  ) {
    this.result = this.studentsService.resultItems$

  }


  ngOnInit(): void {
    this.getStudents(this.pageDefault, this.perPage, this.filter, this.orden)
    this.subscroptions.push( this.roleService.getRoles().subscribe(
      res=> {
        this.optionsRoles = res.map(v=> {return {name : v.name, value: v.id}})
      }
    ) )

  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getStudents(e.pageIndex + 1, e.pageSize)

  }



  getStudents(currentPage?, perPage?, filter?, sort?) {
    this.subscroptions.push(this.studentsService.getStudents(currentPage, perPage, filter, sort).subscribe(next => this.loadData())) ;
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
    this.getStudents(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.studentsService.deleteStudent(id)
  }

  itemAction(event) {
    console.log(event);

    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/alumnos/editar-usuario', event.element.id])    
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
