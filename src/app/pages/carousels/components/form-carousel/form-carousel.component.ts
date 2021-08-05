import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carousel } from '../../interfaces/carousel';

@Component({
  selector: 'mvd-form-carousel',
  templateUrl: './form-carousel.component.html',
  styleUrls: ['./form-carousel.component.scss']
})
export class FormCarouselComponent implements OnInit, AfterViewInit {

  form:FormGroup
  edit : boolean = false
  @Input() carousel : any
  @Output() dataSubmit : EventEmitter<any> = new EventEmitter


  constructor(
    private fb:FormBuilder,
  ) {
    this.createForm()
  }


  ngOnInit(): void {
    console.log(this.carousel);

    if (this.carousel !== true) {
      this.setForm()
      this.edit= true
    }
  }

  ngAfterViewInit(){

  }

  createForm(){
    this.form= this.fb.group({
      id:[],
      name:[null, Validators.required],
      platform:[{value:'Web', disabled:true}],
      status:[false]
    })
  }

  setForm(){
    this.form.setValue({
      id : this.carousel?.id,
      name: this.carousel?.name,
      platform: this.carousel?.platform,
      status: this.carousel?.status
    })
  }

  onSubmit(){
    this.dataSubmit.emit(this.form.value)
  }

  getErrorMessage(validator){
    let message
    switch (validator) {
      case 'notIncludedIn':{
        message = "El email ya existe"
        break;
      }
      case 'email':{
        message = "Email no válido"
        break;
      }
      case 'date':{
        message = "Formato de fecha inválido"
        break;
      }
      case 'number':{
        message = "Solo números"
        break;
      }
      case 'required':{
        message = "Campo requerido"
        break;
      }

      default:
        message = "No válido"
        break;
    }

    return message
  }

}
