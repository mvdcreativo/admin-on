import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Product } from '../../products/interfaces/product';

@Component({
  selector: 'mvd-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() courses: Product[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.loadData()
  }

  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID ', col: 'id' },
    { title: 'Titulo ', col: 'title' },
    { title: 'Profesor', col: 'user_instructor' },
    { title: 'Inicio ', col: 'date_ini', pipe: 'dd/MM/yyyy' },
  ];

  dataSource: Observable<any[]>;

  loadData() {
    const data = of(this.courses);
    this.dataSource = data.pipe(map(v => {
      const dataTable = v.map(x => {
        let styleClass = null

        return {
          id: x?.id,
          title: x?.title,
          user_instructor: x?.user_instructor?.name,
          status_id: x?.status_id,
          date_ini: x?.date_ini,
          class: styleClass
        }
      })
      return dataTable;
    }))

  }
}
