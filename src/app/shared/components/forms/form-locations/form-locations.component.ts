import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { City, Neighborhood, State } from 'src/app/shared/interfaces/ubication';
import { UbicationService } from 'src/app/shared/services/ubications/ubication.service';
import { ModalLocationsComponent } from '../../modals/modal-locations/modal-locations.component';

@Component({
  selector: 'mvd-form-locations',
  templateUrl: './form-locations.component.html',
  styleUrls: ['./form-locations.component.scss']
})
export class FormLocationsComponent implements OnInit {

  @Output() changeForm: EventEmitter<FormGroup> = new EventEmitter
  @Input() data: any
  public form: FormGroup

  states: Observable<State[]>;
  cities: Observable<City[]>;
  neighborhoods: Observable<Neighborhood[]>;

  barrio:boolean = false;
  ciudad:boolean = false;
  user: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ubicationService: UbicationService,  

  ) { 
    
  }

  



  save(form) {
    this.changeForm.emit(form)
  }



  ngOnInit(): void {
    console.log(this.data);
    
    this.createForm()
    switch (this.data.typeLocation) {
      case "neighborhoods":
        this.barrio = true
        break;
      
      case "cities":
        this.ciudad = true
        break;

      case "user":
        this.user = true
        break;
          
      default:
        break;
    }
    
    this.states = this.ubicationService.getStates();
    this.cities = this.ubicationService.getCities();
    this.neighborhoods = this.ubicationService.getNeighborhoods();

  }


  createForm(){
 
    console.log(this.data);
    const dataEdit = this.data.elementEdit;
    console.log(dataEdit);
    
    this.form = this.fb.group(
      {
        country_id: 1,
        name:  [dataEdit?.name, Validators.required],
        code:  [dataEdit?.code, Validators.required],
        neighborhood_id:  [dataEdit?.neighborhood_id, Validators.required] ,

        city_id: [dataEdit?.city_id],
        state_id: [dataEdit?.state_id],

      }
    )

    this.form.valueChanges.subscribe(res=> this.save(this.form))
    this.save(this.form)
  }



  public onSelectState() {
    this.form.get('city_id').setValue(null, { emitEvent: false });
    this.form.get('neighborhood_id').setValue(null, { emitEvent: false });
  }
  public onSelectCity() {
    this.form.get('neighborhood_id').setValue(null, { emitEvent: false });

  }
  public onSelectNeighborhood() {
    // this.form.controls['street'].setValue(null, {emitEvent: false});
  }
}
