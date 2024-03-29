import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Column } from "./interfaces/table";
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'mvd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {

  @Input() dataSource
  @Input() btn_edit: boolean = true
  @Input() btn_delete: boolean = true
  @Input() columns: Column[];
  @Output() actionChange: EventEmitter<any> = new EventEmitter;
  displayedColumns: any[];
  url: any;
  checked: boolean



  constructor(
    public dialog: MatDialog,
    private router: Router

  ) {
    new MatTableDataSource(this.dataSource)

  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(v => v.col)
    this.displayedColumns.push('actions')
    console.log(this.columns);

  }
  toggleChange(element){
    const action = { action: 'toggle', element: element }
    this.actionChange.emit(action)
  }
  editItem(element) {
    const action = { action: 'edit', element: element }
    this.actionChange.emit(action)
  }

  cloneItem(element) {
    let message = "Creará un nuevo curso idéntico"
    this.openDialog(element,'CLON', message)
  }

  deleteItem(element, message?) {
    this.openDialog(element,'DEL', message)
  }



  openDialog(element, accion, message?): void {
    !message ? message = "" : message = message;
    let name
    if (element?.name) {
      name = element.name
    } else {
      name = element.title
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { name: name, message: message, value: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.value) {
        if (accion === "DEL") {
          const action = { action: 'delete', element: element }
          this.actionChange.emit(action)
        }

        if (accion === "CLON") {
          const action = { action: 'clone', element: element }
          this.actionChange.emit(action)
        }
      }
    });

  }

  publication(element) {
    if (element) {

      this.router.navigate(['/publicaciones/publicacion', element.publication_id])
    }
  }

  icon(i) {
    console.log(i);
    console.log(this.dataSource[i].ico);
    return this.dataSource[i].ico
  }


  isPageProduct() {
    const requestUrl = this.router.url.split("/")
    if (requestUrl[1] === "productos") return true;
    return false
  }

  isPaymentEnroll() {
    const requestUrl = this.router.url.split("/")
    if (requestUrl[1] === "inscripciones" || requestUrl[1] === "pagos") return true;
    return false
  }


  addEnroll(e){
    this.router.navigate(['/inscripciones/nueva', e.id])
  }
}
