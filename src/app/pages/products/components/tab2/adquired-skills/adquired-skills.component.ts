import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AdquiredSkills, Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/modals/confirm/confirm.component';


@Component({
  selector: 'mvd-adquired-skills',
  templateUrl: './adquired-skills.component.html',
  styleUrls: ['./adquired-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdquiredSkillsComponent implements OnInit {

@Input() product: Observable<Product>
public skills: Observable<AdquiredSkills[]>
  product_id: number;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.skills = this.product.pipe(map(v=> {
      this.product_id =v.id
      return v.adquired_skills
    }))
    
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
          this.updateAdquiredSkill(result)
          
        }else{
          this.storeAdquiredSkill(result)
        }

      }
      
    });
  }

  setFields(elementEdit? : AdquiredSkills) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'course_id', type: 'hidden', value: this.product_id, label: 'course_id' },
      { nameControl: 'title', type: 'text', value: elementEdit?.title, label: 'Nombre', validators: [Validators.required] },
    ]

    return fields
  }


  storeAdquiredSkill(data){
    this.productService.storeAdquiredSkill(data).pipe(take(1)).subscribe()
  }

  updateAdquiredSkill(data){
    this.productService.updateAdquiredSkill(data).pipe(take(1)).subscribe()
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
        
        this.productService.deleteAdquiredSkill(element.id)
      }
    });
    
  }

}
