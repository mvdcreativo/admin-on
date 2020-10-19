import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ConfirmComponent } from 'src/app/shared/components/modals/confirm/confirm.component';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { CourseSection, Lesson, Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'mvd-sections-lesons',
  templateUrl: './sections-lesons.component.html',
  styleUrls: ['./sections-lesons.component.scss']
})
export class SectionsLesonsComponent implements OnInit, OnDestroy{

  @Output() submit : EventEmitter<any> = new EventEmitter<any>();

  productEdit$: Observable<Product>;
  sections$: Observable<CourseSection[]>;
  sections: CourseSection[];
  subscriptions: Subscription[] = [];
  idProduct: number;
  panel: number = null;
  fields: any = null
  

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productEdit$ = this.productService.productOnEdit
    this.sections$ = this.productEdit$.pipe(map(v=> {
      this.idProduct = v?.id;
      return v?.course_sections
    }))

    this.subscriptions.push(this.sections$.subscribe(res => this.sections = res))
  }


  drop(event: CdkDragDrop<CourseSection[]>) {

    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    console.log(this.sections);
    
    this.subscriptions.push(this.productService.sectionsSortUpdate(this.sections).subscribe())

  }


  dropLesson(event: CdkDragDrop<Lesson[]>, lessons, indexPanel) {

    moveItemInArray(lessons, event.previousIndex, event.currentIndex);
    console.log(event);
    
    this.subscriptions.push(this.productService.lessonsSortUpdate(lessons).subscribe(
      res => {
        console.log(res);
        this.panel = indexPanel;
        
      }
    ))

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
          this.updateCourseSection(result)
          
        }else{
          this.storeCourseSection(result)
        }

      }
      
    });
  }

  setFields(elementEdit? : CourseSection) {
    let title = elementEdit?.title ? "Tema de estudio "+ elementEdit?.title : "Tema de estudio ";
    const fields = [
      { titleForm: title },
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'product_id', type: 'hidden', value: this.idProduct, label: 'Id' },
      { nameControl: 'title', type: 'text', value: elementEdit?.title, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'init_date', type: 'date', value: elementEdit?.init_date, label: 'Fecha de Inicio' },
      { nameControl: 'position', type: 'number', value: elementEdit?.position, label: 'Orden', validators: [Validators.required] },
      { nameControl: 'description', type: 'textarea', value: elementEdit?.description, label: 'Descripción' },
    ]

    return fields
  }

  setFieldsLesson(element) {    
    console.log(this.sections);
    const sectionOptions : OptionSelect[] = this.sections.map(v => {
      return {value: v.id, name: v.title}
    })
    let title =  "Lección ";
    const fields = [
      { titleForm: title },
      { nameControl: 'id', type: 'hidden', value: "", label: 'Id' },
      { nameControl: 'course_section_id', type: 'select', value: element.id, options: sectionOptions, label: 'Tema', validators: [Validators.required] },
      { nameControl: 'name', type: 'text', value: "", label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'duration', type: 'text', value: "", label: 'Duración' },
      { nameControl: 'position', type: 'number', value: "", label: 'Orden', validators: [Validators.required] },
      { nameControl: 'description', type: 'textarea', value: "", label: 'Descripción' },
    ]

    return fields
  }


  storeCourseSection(data){
    this.productService.storeCourseSection(data).pipe(take(1)).subscribe()
  }

  updateCourseSection(data){
    this.productService.sectionsUpdate(data).pipe(take(1)).subscribe()
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
        
        this.productService.deleteCourseSection(element.id)
      }
    });
    
  }


  fieldsLesson(e){
    this.fields = e
  }

  openDialogAddLesson(section){
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '650px',
      data: this.setFieldsLesson(section)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          
        }else{
          this.storeLesson(result)
        }

      }
      
    });
  }

  storeLesson(data){
    this.productService.storeLesson(data).pipe(take(1)).subscribe()
  }


  ngOnDestroy(): void {
    this.subscriptions.map(v=> v.unsubscribe())
    
  }

  onSubmit(){
    this.submit.emit(-1)
  }
}
