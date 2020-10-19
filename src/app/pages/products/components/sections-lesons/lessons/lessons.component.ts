import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/components/modals/confirm/confirm.component';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { Lesson, OptionSelect, Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'mvd-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, OnDestroy {

@Input()lesson : Lesson;
@Output()fields : EventEmitter<any> = new EventEmitter
  productEdit$: Observable<Product>;
  product$: Observable<Product>;
  idProduct: number;
  sections: OptionSelect[];
  subscriptions: Subscription[] = [];


  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productEdit$ = this.productService.productOnEdit
    this.subscriptions.push(this.productEdit$.subscribe(
      res => 
      this.sections = res.course_sections.map( o => { return { name: o.title, value: o.id}} )
    ))
    
      
    this.fields.emit(this.setFields());

    
  }

  
  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '650px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateLesson(result)
          
        }else{
          this.storeLesson(result)
        }

      }
      
    });
  }

  setFields(elementEdit? : Lesson) {    
    let title = elementEdit?.name ? "Lección "+ elementEdit?.name : "Lección ";
    const fields = [
      { titleForm: title },
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'course_section_id', type: 'select', value: elementEdit?.course_section_id, options: this.sections, label: 'Tema', validators: [Validators.required] },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'duration', type: 'text', value: elementEdit?.duration, label: 'Duración' },
      { nameControl: 'position', type: 'number', value: elementEdit?.position, label: 'Orden', validators: [Validators.required] },
      { nameControl: 'description', type: 'textarea', value: elementEdit?.description, label: 'Descripción' },
    ]

    return fields
  }


  storeLesson(data){
    this.productService.storeLesson(data).pipe(take(1)).subscribe()
  }

  updateLesson(data){
    this.productService.lessonUpdate(data).pipe(take(1)).subscribe()
  }

  openDialogDelete(element):void {
    let name 
    if (element?.name) {
      name = element.name
    } else {
      name = element.title
    }
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {name: name, message: "", value: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.value){
        // console.log(element.id);
        
        this.productService.deleteLesson(element.id)
      }
    });
    
  }


  ngOnDestroy(): void {
    this.subscriptions.map(v=> v.unsubscribe())
    
  }

}
