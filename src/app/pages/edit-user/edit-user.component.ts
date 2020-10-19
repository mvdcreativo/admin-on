import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../accounts/interfaces/account';
import { UsersService } from './services/users.service';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Validators } from "@angular/forms";
import {default as _rollupMoment} from 'moment';
import { RoleService } from 'src/app/shared/services/roles/role.service';
import { OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
const moment = _rollupMoment;

@Component({
  selector: 'mvd-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EditUserComponent implements OnInit, OnDestroy {
  userEdit: User;
  subscriptions: Subscription[] = []
  optionsRoles: OptionSelect[];
  fields;
  urlRequest: any[];
  typesDocIden: { name: string; value: string; }[];

  constructor(
    private activateRouter: ActivatedRoute,
    private router : Router,
    private userService: UsersService,
    private roleService: RoleService,

  ) { }

  ngOnInit(): void {

    
    this.urlRequest = this.router.url.split("/")
     
    
    this.activateRouter.paramMap.subscribe(
      (params:Params) => {
          if(params.params.id){
            this.subscriptions.push(this.userService.getUser(params.params.id).subscribe(
              v => {
                this.userEdit = v.data
                console.log(this.userEdit);
                this.getRoles()
                
              }
              ))
          }else{
            this.userEdit = null
            this.getRoles()
          }
        
      }
    )
  }


  ngOnDestroy(): void {
    this.subscriptions.map(v=>v.unsubscribe())
    
  }

  private getRoles(){
    this.subscriptions.push( this.roleService.getRoles().subscribe(
      res=> {
        this.optionsRoles = res.map(v=> {return {name : v.name, value: v.id}})        
        console.log(this.optionsRoles);
        this.fields = this.setFields()
        
      }
    ) )
  }


  setFields() {
    // console.log(elementEdit);
    this.typesDocIden = [
      {name: 'C.I.', value:'C.I.'},
      {name: 'Pasaporte', value:'Pasaporte'}
    ]
    if (this.urlRequest[1]==="docentes") {
      const fields = [
        { nameControl: 'id', type: 'hidden', value: this.userEdit?.id, label: 'Id' },
        // { nameControl: 'password', type: 'hidden', value: 'secret', label: 'Id' },
        { nameControl: 'image', type: 'image', value: this.userEdit?.account.image, label: 'Imagen' },
        { nameControl: 'name', type: 'text', value: this.userEdit?.name, label: 'Nombre', validators: [Validators.required] },
        { nameControl: 'last_name', type: 'text', value: this.userEdit?.last_name, label: 'Apellido', validators: [Validators.required] },
        { nameControl: 'type_doc_iden', type: 'select', value: this.userEdit?.account.type_doc_iden, label: 'Tipo documento de identidad',options: this.typesDocIden , validators: [Validators.required] },
        { nameControl: 'n_doc_iden', type: 'text', value: this.userEdit?.account.n_doc_iden, label: 'Nº documento', validators: [Validators.required] },
        { nameControl: 'email', type: 'text', value: this.userEdit?.email, label: 'Email', validators: [Validators.required] },
        { nameControl: 'address_one', type: 'text', value: this.userEdit?.account.address_one, label: 'Dirección' },
        { nameControl: 'birth', type: 'date', value:  moment(this.userEdit?.account.birth).format('YYYY-MM-DD HH:mm:ss'), label: 'Fecha de nacimiento' },
        { nameControl: 'certificated', type: 'text', value: this.userEdit?.account.certificated, label: 'Profesión/es / Títulos', validators: [Validators.required] },
        { nameControl: 'n_identification', type: 'text', value: this.userEdit?.account.n_identification, label: 'Nº funcionario', validators: [Validators.required] },
        { nameControl: 'phone_two', type: 'text', value: this.userEdit?.account.phone_two, label: 'Celular', validators: [Validators.required] },
        { nameControl: 'phone_one', type: 'text', value: this.userEdit?.account.phone_one, label: 'Teléfono' },
        { nameControl: 'role_id', type: 'select', value: 1, label: 'Rol en Sistema', options: this.optionsRoles , validators: [Validators.required]},
        { nameControl: 'bio', type: 'textarea', value: this.userEdit?.account.bio, label: 'Descripción / Bio', validators: [Validators.required] },
      ]
      return fields

    } else {
      const fields = [
        { nameControl: 'id', type: 'hidden', value: this.userEdit?.id, label: 'Id' },
        // { nameControl: 'password', type: 'hidden', value: 'secret', label: 'Id' },
        { nameControl: 'image', type: 'image', value: this.userEdit?.account.image, label: 'Imagen' },
        { nameControl: 'name', type: 'text', value: this.userEdit?.name, label: 'Nombre', validators: [Validators.required] },
        { nameControl: 'last_name', type: 'text', value: this.userEdit?.last_name, label: 'Apellido', validators: [Validators.required] },
        { nameControl: 'type_doc_iden', type: 'select', value: this.userEdit?.account.type_doc_iden, label: 'Tipo documento de identidad',options: this.typesDocIden , validators: [Validators.required] },
        { nameControl: 'n_doc_iden', type: 'text', value: this.userEdit?.account.n_doc_iden, label: 'Nº documento', validators: [Validators.required] },
        { nameControl: 'email', type: 'text', value: this.userEdit?.email, label: 'Email', validators: [Validators.required] },
        { nameControl: 'address_one', type: 'text', value: this.userEdit?.account.address_one, label: 'Dirección' },
        { nameControl: 'birth', type: 'date', value:  moment(this.userEdit?.account.birth).format('YYYY-MM-DD HH:mm:ss'), label: 'Fecha de nacimiento' },
        // { nameControl: 'certificated', type: 'text', value: this.userEdit?.account.certificated, label: 'Profesión/es / Títulos', validators: [Validators.required] },
        // { nameControl: 'n_identification', type: 'text', value: this.userEdit?.account.n_identification, label: 'Nº funcionario', validators: [Validators.required] },
        { nameControl: 'phone_two', type: 'text', value: this.userEdit?.account.phone_two, label: 'Celular', validators: [Validators.required] },
        { nameControl: 'phone_one', type: 'text', value: this.userEdit?.account.phone_one, label: 'Teléfono' },
        { nameControl: 'role_id', type: 'select', value: 2, label: 'Rol en Sistema', options: this.optionsRoles , validators: [Validators.required]},
        // { nameControl: 'bio', type: 'textarea', value: this.userEdit?.account.bio, label: 'Descripción', validators: [Validators.required] },
      ]     
      return fields
    }
    // console.log(fields);
    
  }


  action(e){
    console.log(e);
    
        if (e.id) {
          this.updateUser(e)
          
        }else{
          this.storeUser(e)
        }
  }


  storeUser(data){
    this.userService.storeUser(data).pipe(take(1)).subscribe(
      res=> {
          this.router.navigate([`/${this.urlRequest[1]}`])
      }
    )
  }

  updateUser(data){
    this.userService.updateUser(data).pipe(take(1)).subscribe(
      res=> {
        this.router.navigate([`/${this.urlRequest[1]}`])        
      }
    )
  }
}
