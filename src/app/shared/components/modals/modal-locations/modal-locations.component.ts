import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UbicationService } from 'src/app/shared/services/ubications/ubication.service';
import { Observable } from 'rxjs';
import { State, City, Neighborhood } from 'src/app/shared/interfaces/ubication';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgSwitchDefault } from '@angular/common';


@Component({
  templateUrl: './modal-locations.component.html',
  styleUrls: ['./modal-locations.component.scss']
})
export class ModalLocationsComponent implements OnInit{


  form: any;
  
  constructor(
    public dialogRef: MatDialogRef<ModalLocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ){}

  ngOnInit(){
    
    console.log(this.data);
  }

  setForm(e){
    if (e){

      this.form = e.value;
    }
    
  }
  save() {
    
    this.dialogRef.close({data: this.form, location_type: this.data.typeLocation});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
