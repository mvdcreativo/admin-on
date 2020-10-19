import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/components/modals/confirm/confirm.component';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { Product, Schedule } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Validators } from '@angular/forms';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';


@Component({
  selector: 'mvd-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  @Output() submit = new EventEmitter<any>();


  productEdit$: Observable<Product>;

  
  
  
  public schedules: Observable<Schedule[]>
  product_id: number;
  
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    ) { }
    
    ngOnInit(): void {
      this.productEdit$ = this.productService.productOnEdit
      
      this.schedules = this.productEdit$.pipe(map(v=> {
        this.product_id =v.id
        return v.schedules
      }))
      
    }
    
    onSubmit(){
      this.submit.emit(2)
    }

  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '550px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateSchedule(result)
          
        }else{
          this.storeSchedule(result)
        }

      }
      
    });
  }

  optionsDays(): OptionSelect[]{
    const days: OptionSelect[] = [
      { value:"Lunes", name:"Lunes" },
      { value:"Martes", name:"Martes" },
      { value:"Miércoles", name:"Miércoles" },
      { value:"Jueves", name:"Jueves" },
      { value:"Viernes", name:"Viernes" },
      { value:"Sábado", name:"Sábado" },
      { value:"Domingo", name:"Domingo" }
    ];
    return days;
  }
  setFields(elementEdit? : Schedule) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'course_id', type: 'hidden', value: this.product_id, label: 'course_id' },
      { nameControl: 'day', type: 'select', value: elementEdit?.day, label: 'Día', validators: [Validators.required], options: this.optionsDays() },
      { nameControl: 'h_ini', type: 'time', value: elementEdit?.h_ini, label: 'Hora de inicio', validators: [Validators.required] },
      { nameControl: 'h_end', type: 'time', value: elementEdit?.h_end, label: 'Hora de fin', validators: [Validators.required] },
    ]

    return fields
  }


  storeSchedule(data){
    this.productService.storeSchedule(data).pipe(take(1)).subscribe()
  }

  updateSchedule(data){
    this.productService.updateSchedule(data).pipe(take(1)).subscribe()
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
      data: {name: "Horario", message: "", value: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.value){
        // console.log(element.id);
        
        this.productService.deleteSchedule(element.id)
      }
    });
    
  }
}
